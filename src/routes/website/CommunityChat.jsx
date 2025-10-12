import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import * as yup from "yup";
import useGetCommunityChats from "../../hooks/website/communities/chat/useGetCommunityChats";
import useSendMessage from "../../hooks/website/communities/chat/useSendMessage";
import Message from "../../ui/chat/Message";
import InfiniteScroll from "../../ui/loading/InfiniteScroll";
import RoundedBackButton from "../../ui/website-auth/shared/RoundedBackButton";
import { ChatSocketService } from "../../utils/ChatSocketService";
import { getToken } from "../../utils/token";

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
      "يجب كتابة رسالة أو إرفاق ملف",
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

export default function CommunityChat() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { lang } = useSelector((state) => state.language);
  const { user } = useSelector((state) => state.authRole);

  // ===== States =====
  const [selectedFile, setSelectedFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [micPermission, setMicPermission] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  const { chats, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetCommunityChats();
  const allChats = chats?.pages?.flatMap((page) => page?.data).reverse() ?? [];

  const { sendMessage, isPending } = useSendMessage();

  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [initialScrollDone, setInitialScrollDone] = useState(false);

  // ===== Scroll to bottom after first load =====
  useLayoutEffect(() => {
    if (!isLoading && allChats.length > 0 && !initialScrollDone) {
      // scroll to bottom
      requestAnimationFrame(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
        }
      });
      setInitialScrollDone(true);
    }
  }, [isLoading, allChats, initialScrollDone]);

  // ===== SOCKET CONNECTION =====
  useEffect(() => {
    const socket = new ChatSocketService();
    const token = getToken();
    socket.connectPrivate({
      token,
      communityId: id,
    });

    socket.onMessage((message) => {
      console.log("message from the calback", message);

      queryClient.setQueryData(["community-chat", id], (oldData) => {
        if (!oldData) return oldData;
        const updatedPages = [...oldData.pages];
        console.log(oldData);

        // Assuming the latest messages are in the first page
        updatedPages[0] = {
          ...updatedPages[0],
          data: [...updatedPages[0].data, message],
        };
        return { ...oldData, pages: updatedPages };
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [id, queryClient]);

  // ===== FORM HOOK =====
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      message: "",
      file: null,
      audio: null,
    },
  });

  // ===== PERMISSION =====
  const askForMicPermission = async () => {
    if (micPermission) return true;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((t) => t.stop());
      setMicPermission(true);
      return true;
    } catch {
      alert("من فضلك فعّل إذن الميكروفون للتسجيل الصوتي");
      return false;
    }
  };

  // ===== TIMER =====
  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setRecordingTime((t) => t + 1);
    }, 1000);
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

  // ===== RECORDING CONTROLS =====
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

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        setValue("audio", blob);

        // Stop all mic tracks
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

  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== "inactive") {
      recorder.stop(); // will trigger onstop()
    }
  };

  const cancelRecording = () => {
    const recorder = mediaRecorderRef.current;

    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
    }

    stopTimer();
    setAudioBlob(null);
    setRecordingTime(0);
    setIsRecording(false);
    setIsPaused(false);
    setValue("audio", null);

    // stop mic if still active
    if (recorder?.stream) {
      recorder.stream.getTracks().forEach((t) => t.stop());
    }
  };

  // ===== SEND MESSAGE =====
  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    let type = "text";

    console.log(formData);

    if (data.audio instanceof Blob) {
      formData.append("file_path", data.audio, "recording.webm");
      type = "audio";
    } else if (data.file instanceof File) {
      formData.append("file_path", data.file);
      type = getMessageType(data.file);
    } else if (data.message?.trim()) {
      formData.append("message", data.message.trim());
      type = "text";
    } else {
      return;
    }

    formData.append("type", type);
    formData.append("community_id", id);

    sendMessage(formData);

    cancelRecording();
    reset();
    setSelectedFile(null);
  };

  // ===== RENDER =====
  return (
    <div className="container">
      <div className="community-chat-window">
        <div className="chat-window">
          {/* ===== Header ===== */}
          <div className="chat-window__info">
            <RoundedBackButton onClick={() => navigate(-1)}></RoundedBackButton>

            <h4 className="chat-window__name">{t("chats")}</h4>
          </div>

          <div className="chat-window__hint">
            <p>هذه محادثة جماعية، رسائلك مرئية للجميع</p>
          </div>

          {/* ===== Messages ===== */}
          <div className="chat-window__messages" ref={chatContainerRef}>
            <InfiniteScroll
              onLoadMore={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              revers={true}
            >
              {" "}
              {(isLoading || isFetchingNextPage) && (
                <div className="d-flex align-items-center  py-3  justify-content-center">
                  <div className="loader"></div>
                </div>
              )}
              {allChats.map((chat) => {
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
                      chat.sender.id === user.id
                        ? user?.image
                        : chat?.sender?.image
                    }
                  />
                );
              })}
            </InfiniteScroll>
          </div>

          {/* ===== Footer Form ===== */}
          <form
            className="chat-window__footer"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                  placeholder="اكتب رسالتك هنا..."
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
                  //  validate type (safety check)
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
      </div>
    </div>
  );
}
