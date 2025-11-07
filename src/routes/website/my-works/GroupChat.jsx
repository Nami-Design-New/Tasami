import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import * as yup from "yup";
import useGetGroupChats from "../../../hooks/website/MyWorks/groups/chat/useGetGroupChat";
import useSendGroupMessage from "../../../hooks/website/MyWorks/groups/chat/useSendGroupMessage";
import Message from "../../../ui/chat/Message";
import InfiniteScroll from "../../../ui/loading/InfiniteScroll";
import RoundedBackButton from "../../../ui/website-auth/shared/RoundedBackButton";
import { GroupChatSocketService } from "../../../utils/GroupChatService";
import { getToken } from "../../../utils/token";

const getMessageType = (file) => {
  if (!file) return "text";
  if (file.type.startsWith("image/")) return "image";
  if (file.type.startsWith("audio/")) return "audio";
  if (file.type.startsWith("video/")) return "video";
  return "file";
};

export default function GroupChat() {
  const { t } = useTranslation();
  // Validation schema
  const schema = yup.object().shape({
    message: yup
      .string()
      .nullable()
      .test(
        "message-or-file-or-audio",
        t("messageOrFileRequired"),
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
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  //   const { lang } = useSelector((state) => state.language);
  const { user } = useSelector((state) => state.authRole);

  // ===== States =====
  const [selectedFile, setSelectedFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [micPermission, setMicPermission] = useState(false);
  const [, setSocketStatus] = useState("connecting");

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  const { chats, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useGetGroupChats();
  const allChats = chats?.pages?.flatMap((page) => page?.data).reverse() ?? [];

  const { sendMessage } = useSendGroupMessage();

  //   const messagesEndRef = useRef(null);
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
    const socket = new GroupChatSocketService();
    const token = getToken();

    socket.onStatusChange((status) => {
      console.log("Socket status changed:", status);
      setSocketStatus(status);
    });

    socket.onMessage((message) => {
      console.log("Incoming message:", message);
      queryClient.setQueryData(["group-chat", id], (oldData) => {
        if (!oldData) return oldData;
        const updatedPages = oldData.pages.map((page, idx) =>
          idx === 0 ? { ...page, data: [message, ...page.data] } : page
        );
        return { ...oldData, pages: updatedPages };
      });

      requestAnimationFrame(() => {
        const container = chatContainerRef.current;
        if (!container) return;
        const isNearBottom =
          container.scrollHeight -
            container.scrollTop -
            container.clientHeight <
          150;
        if (isNearBottom) container.scrollTop = container.scrollHeight;
      });
    });

    socket.connectPrivate({ token, groupId: id });
    return () => socket.disconnect();
  }, [id, queryClient]);

  // ===== FORM HOOK =====
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    // formState: { errors },
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
      alert(t("enableMicPermission"));
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

  //   const stopRecording = () => {
  //     const recorder = mediaRecorderRef.current;
  //     if (recorder && recorder.state !== "inactive") {
  //       recorder.stop(); // will trigger onstop()
  //     }
  //   };

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
    formData.append("group_id", id);

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
          <div className="chat-window__info d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <RoundedBackButton onClick={() => navigate(-1)} />
              <h4 className="chat-window__name mb-0">{t("chats")}</h4>
            </div>
            {/* Live socket status indicator */}
            {/* <div className="socket-status d-flex align-items-center gap-2">
              {socketStatus === "connected" && (
                <span className="text-success">🟢 Connected</span>
              )}
              {socketStatus === "connecting" && (
                <span className="text-warning">🟡 Connecting...</span>
              )}
              {socketStatus === "disconnected" && (
                <span className="text-danger">🔴 Disconnected</span>
              )}
              {socketStatus === "error" && (
                <span className="text-danger">⚠️ Error</span>
              )}
            </div> */}
          </div>

          <div className="chat-window__hint">
            <p>{t("groupChatNotice")}</p>
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
                  placeholder={t("writeYourMessage")}
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
