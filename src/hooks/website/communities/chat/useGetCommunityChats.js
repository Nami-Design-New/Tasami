// import { useInfiniteQuery } from "@tanstack/react-query";
// import { useNavigate, useParams } from "react-router";
// import { axiosInstance } from "../../../../lib/axios";
// import { useEffect } from "react";

// export default function useGetCommunityChats() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const {
//     data: chats,
//     isLoading,
//     error,
//     hasNextPage,
//     fetchNextPage,
//     isFetchingNextPage,
//   } = useInfiniteQuery({
//     queryKey: ["community-chat", id],
//     queryFn: async ({ pageParam = 1 }) => {
//       const res = await axiosInstance.get("community-chat", {
//         params: {
//           community_id: id,
//           pagenation: "on",
//           page: pageParam,
//         },
//       });
//       if (res?.data?.code !== 200) {
//         console.log("iam in not 200");
//         if (res.data.code === 404) {
//           const err = new Error("Not Found");
//           err.status = 404;
//           throw err;
//         } else {
//           throw new Error(res.data.message || "Error Fetching Chats");
//         }
//       }
//       return res.data;
//     },
//     getNextPageParam: (lastPage) => {
//       return lastPage?.next_page_url
//         ? new URL(lastPage.next_page_url).searchParams.get("page")
//         : undefined;
//     },
//   });

//   // Redirect if 404 error
//   useEffect(() => {
//     if (error && error.status === 404) {
//       navigate(-1, { replace: true });
//     }
//   }, [error, navigate]);
//   return {
//     chats,
//     isLoading,
//     error,
//     hasNextPage,
//     fetchNextPage,
//     isFetchingNextPage,
//   };
// }
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
  const { user } = useSelector((state) => state.authRole);
  const [socketStatus, setSocketStatus] = useState("connecting");

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

  const { sendMessage } = useSendMessage();
  const chatContainerRef = useRef(null);
  const [initialScrollDone, setInitialScrollDone] = useState(false);

  // ===== Scroll to bottom after first load =====
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

  // ===== SOCKET CONNECTION =====
  useEffect(() => {
    const socket = new ChatSocketService();
    const token = getToken();

    socket.onStatusChange((status) => {
      console.log("🔔 Socket status changed:", status);
      setSocketStatus(status);
    });

    socket.onMessage((message) => {
      queryClient.setQueryData(["community-chat", id], (oldData) => {
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

    socket.connectPrivate({ token, communityId: id });
    return () => socket.disconnect();
  }, [id, queryClient]);

  // ===== FORM HOOK =====
  const { register, handleSubmit, setValue, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { message: "", file: null, audio: null },
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
      alert(t("enable_mic_permission"));
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

    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
    }

    stopTimer();
    setAudioBlob(null);
    setRecordingTime(0);
    setIsRecording(false);
    setIsPaused(false);
    setValue("audio", null);

    if (recorder?.stream) {
      recorder.stream.getTracks().forEach((t) => t.stop());
    }
  };

  // ===== SEND MESSAGE =====
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
          <div className="chat-window__info d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <RoundedBackButton onClick={() => navigate(-1)} />
              <h4 className="chat-window__name mb-0">{t("community_chat")}</h4>
            </div>
          </div>

          <div className="chat-window__hint">
            <p>{t("group_chat_hint")}</p>
          </div>

          {/* ===== Messages ===== */}
          <div className="chat-window__messages" ref={chatContainerRef}>
            <InfiniteScroll
              onLoadMore={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              revers={true}
            >
              {(isLoading || isFetchingNextPage) && (
                <div className="d-flex align-items-center py-3 justify-content-center">
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
                    title={t("stop_recording")}
                  >
                    <i className="fa-solid fa-stop"></i>
                  </button>

                  {!isPaused ? (
                    <button
                      type="button"
                      onClick={pauseRecording}
                      title={t("pause_recording")}
                    >
                      <i className="fa-solid fa-pause"></i>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={resumeRecording}
                      title={t("resume_recording")}
                    >
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
                    title={t("cancel_audio")}
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
                    title={t("remove_file")}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              ) : (
                <input
                  type="text"
                  className="text-input"
                  placeholder={t("type_message_here")}
                  {...register("message")}
                  disabled={isRecording}
                />
              )}
            </div>

            <div className="chat-actions">
              <label htmlFor="fileInput" title={t("attach_file")}>
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
                title={t("start_recording")}
              >
                <i className="fa-solid fa-microphone"></i>
              </button>
              <button
                type="submit"
                className="chat-window__footer--send"
                title={t("send_message")}
              >
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
