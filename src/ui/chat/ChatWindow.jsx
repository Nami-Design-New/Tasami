import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Message from "./Message";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InfiniteScroll from "../loading/InfiniteScroll";
import useGetChatsMessages from "../../hooks/dashboard/chats/useGetChatsMessages";
import * as yup from "yup";

const getMessageType = (file) => {
  if (!file) return "text";
  if (file.type.startsWith("image/")) return "image";
  if (file.type.startsWith("audio/")) return "audio";
  if (file.type.startsWith("video/")) return "video";
  return "file";
};

// Validation schema
const schema = yup.object().shape({
  message: yup
    .string()
    .nullable()
    .test(
      "message-or-file-or-audio",
      "validation_message_or_file",
      function (value) {
        const { file, audio } = this.parent;
        const hasMessage = value?.trim()?.length > 0;
        const hasFile = file instanceof File;
        const hasAudio = audio instanceof Blob;
        return hasMessage || hasFile || hasAudio;
      }
    ),
  file: yup.mixed().nullable(),
  audio: yup.mixed().nullable(),
});

const ChatWindow = ({ isOpen, setIsOpen, activeChat }) => {
  const { user } = useSelector((state) => state.adminAuth);
  const {
    chatMessages,
    isLoading,
    hasNextPage,
    error,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetChatsMessages();

  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [selectedFile, setSelectedFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [micPermission, setMicPermission] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  const allChats =
    chatMessages?.pages?.flatMap((page) => page?.data).reverse() ?? [];

  // const { sendMessage } = useSendAssistantMessage();
  const chatContainerRef = useRef(null);
  const [initialScrollDone, setInitialScrollDone] = useState(false);

  // Scroll to bottom on first load
  useLayoutEffect(() => {
    if (!isLoading && allChats.length > 0 && !initialScrollDone) {
      requestAnimationFrame(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
        }
      });
      setInitialScrollDone(true);
    }
  }, [isLoading, allChats, initialScrollDone]);

  // // Socket connection
  // useEffect(() => {
  //   const socket = new ContractChatService();
  //   // const token = getToken();

  //   socket.onStatusChange((status) => setSocketStatus(status));

  //   socket.onMessage((message) => {
  //     queryClient.setQueryData(["contract-chat", id], (oldData) => {
  //       if (!oldData) return oldData;
  //       const updatedPages = oldData.pages.map((page, idx) =>
  //         idx === 0 ? { ...page, data: [message, ...page.data] } : page
  //       );
  //       return { ...oldData, pages: updatedPages };
  //     });

  //     requestAnimationFrame(() => {
  //       const container = chatContainerRef.current;
  //       if (!container) return;
  //       const isNearBottom =
  //         container.scrollHeight -
  //           container.scrollTop -
  //           container.clientHeight <
  //         150;
  //       if (isNearBottom) container.scrollTop = container.scrollHeight;
  //     });
  //   });

  //   socket.connectPrivate({ token, contractId: id });
  //   return () => socket.disconnect();
  // }, [id, queryClient]);

  const { register, handleSubmit, setValue, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { message: "", file: null, audio: null },
  });

  const askForMicPermission = async () => {
    if (micPermission) return true;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((t) => t.stop());
      setMicPermission(true);
      return true;
    } catch {
      alert(t("enable_mic_permission"));
      return false;
    }
  };

  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => setRecordingTime((t) => t + 1), 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => () => stopTimer(), []);

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
      2,
      "0"
    )}`;

  // Recording controls
  const startRecording = async () => {
    if (isRecording) return;
    const allowed = await askForMicPermission();
    if (!allowed) return;

    try {
      setSelectedFile(null);
      setValue("file", null);
      setValue("message", "");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];
      setRecordingTime(0);

      recorder.ondataavailable = (e) =>
        e.data.size > 0 && audioChunksRef.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        setValue("audio", blob);
        stream.getTracks().forEach((t) => t.stop());
        stopTimer();
        setIsRecording(false);
        setIsPaused(false);
      };

      recorder.start();
      startTimer();
      setIsRecording(true);
      setIsPaused(false);
    } catch (err) {
      console.error("Failed to start recording:", err);
    }
  };

  const pauseRecording = () => {
    const recorder = mediaRecorderRef.current;
    if (recorder?.state === "recording") {
      recorder.pause();
      setIsPaused(true);
      stopTimer();
    }
  };

  const resumeRecording = () => {
    const recorder = mediaRecorderRef.current;
    if (recorder?.state === "paused") {
      recorder.resume();
      setIsPaused(false);
      startTimer();
    }
  };

  const cancelRecording = () => {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== "inactive") recorder.stop();
    stopTimer();
    setAudioBlob(null);
    setRecordingTime(0);
    setIsRecording(false);
    setIsPaused(false);
    setValue("audio", null);
    if (recorder?.stream) recorder.stream.getTracks().forEach((t) => t.stop());
  };

  // Submit message
  const onSubmit = async (data) => {
    const formData = new FormData();
    let type = "text";

    if (data.audio instanceof Blob) {
      formData.append("file_path", data.audio, "recording.webm");
      type = "audio";
    } else if (data.file instanceof File) {
      formData.append("file_path", data.file);
      type = getMessageType(data.file);
    } else if (data.message?.trim()) {
      formData.append("message", data.message.trim());
    } else {
      return;
    }

    formData.append("type", type);
    formData.append("contract_id", id);
    sendMessage(formData);
    cancelRecording();
    reset();
    setSelectedFile(null);
  };
  return (
    <div className="chat-window">
      <header className="chat-window__header">
        <div className="chat-window__info">
          <button
            onClick={() => {
              setIsOpen(true);
            }}
            className={`chat-window__back ${
              isOpen ? "chat-window__back--open" : ""
            } `}
          >
            <i className="fa-solid fa-arrow-right"></i>
          </button>
          <img src="https://avatar.iran.liara.run/public/1" />
          <div>
            <h4 className="chat-window__name">{activeChat?.name}</h4>
            <span className="chat-window__role">نشط الان</span>
          </div>
        </div>
        {/* <div className="chat-window__actions"></div> */}
      </header>

      <div className="chat-window__messages" ref={chatContainerRef}>
        <InfiniteScroll
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          revers={true}
        >
          {allChats?.map((chat) => {
            const form =
              Number(chat.sender.id) === Number(user.id)
                ? "sender"
                : "receiver";
            return (
              <Message
                key={chat.id}
                from={form}
                creatorId={chat?.creator_id}
                text={chat.message}
                time={chat.created_at}
                sender={chat?.sender}
                filePath={chat?.file_path}
                type={chat?.type}
                avatar={
                  chat.sender.id === user.id ? user?.image : chat?.sender?.image
                }
              />
            );
          })}{" "}
        </InfiniteScroll>
      </div>

      {/* <footer className="chat-window__footer">
        <input type="text" placeholder="اكتب رسالتك هنا..." />
        <button>
          <i className="fa-solid fa-microphone"></i>
        </button>
        <button>
          <i className="fa-solid fa-paperclip-vertical"></i>
        </button>
        <button className="chat-window__footer--send">
          <i className="fa-solid fa-paper-plane"></i>
          <span>إرسال</span>
        </button>
      </footer> */}

      <form className="chat-window__footer" onSubmit={handleSubmit(onSubmit)}>
        <div className="preview-section">
          {isRecording ? (
            <div className={`recording-bar ${isPaused ? "paused" : ""}`}>
              <button
                type="button"
                className="delete-btn"
                onClick={cancelRecording}
              >
                <i className="fa-solid fa-stop"></i>
              </button>

              {!isPaused ? (
                <button type="button" onClick={pauseRecording}>
                  <i className="fa-solid fa-pause"></i>
                </button>
              ) : (
                <button type="button" onClick={resumeRecording}>
                  <i className="fa-solid fa-play"></i>
                </button>
              )}

              <div className="wave"></div>
              <span className="timer">{formatTime(recordingTime)}</span>
            </div>
          ) : audioBlob ? (
            <div className="audio-preview d-flex align-items-center gap-2">
              <audio controls src={URL.createObjectURL(audioBlob)} />
              <button
                type="button"
                className="cancel-audio"
                onClick={cancelRecording}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          ) : selectedFile ? (
            <div className="file-chat-preview">
              <div className="file-info">
                <i className="fa-solid fa-paperclip"></i>
                <span className="file-name">{selectedFile.name}</span>
              </div>
              <button
                type="button"
                className="cancel-file"
                onClick={() => {
                  setSelectedFile(null);
                  setValue("file", null);
                }}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          ) : (
            <input
              type="text"
              className="text-input"
              placeholder={t("chat_type_message")}
              {...register("message")}
              disabled={isRecording}
            />
          )}
        </div>

        <div className="chat-actions">
          <label htmlFor="fileInput">
            <i className="fa-solid fa-paperclip"></i>
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*,video/*"
            hidden
            {...register("file")}
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              const isImage = file.type.startsWith("image/");
              const isVideo = file.type.startsWith("video/");
              if (isImage || isVideo) {
                setValue("message", "");
                setAudioBlob(null);
                cancelRecording();
                setSelectedFile(file);
                setValue("file", file);
              } else {
                e.target.value = "";
              }
            }}
          />
          <button
            type="button"
            onClick={startRecording}
            disabled={selectedFile || isRecording}
          >
            <i className="fa-solid fa-microphone"></i>
          </button>
          <button type="submit" className="chat-window__footer--send">
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
