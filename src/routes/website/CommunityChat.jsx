import { useTranslation } from "react-i18next";
import Message from "../../ui/chat/Message";
import RoundedBackButton from "../../ui/website-auth/shared/RoundedBackButton";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import useGetCommunityChats from "../../hooks/website/communities/chat/useGetCommunityChats";
import InfiniteScroll from "../../ui/loading/InfiniteScroll";
import useSendMessage from "../../hooks/website/communities/chat/useSendMessage";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useRef, useEffect } from "react";

const getMessageType = (file) => {
  if (!file) return "text";
  if (file.type.startsWith("image/")) return "image";
  if (file.type.startsWith("audio/")) return "audio";
  if (file.type.startsWith("video/")) return "video";
  return "file";
};
// ✅ Validation schema
const schema = yup.object().shape({
  message: yup
    .string()
    .test("message-or-file", "يجب كتابة رسالة أو إرفاق ملف", function (value) {
      const { parent } = this;
      return value?.trim()?.length > 0 || parent.file instanceof File;
    }),
  file: yup.mixed().nullable(),
});
export default function CommunityChat() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useSelector((state) => state.language);
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
  const allChats = chats?.pages?.flatMap((page) => page?.data) ?? [];

  const { sendMessage, isPending } = useSendMessage();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const queryClient = useQueryClient();

  //  Send message
  const onSubmit = (data) => {
    const type = getMessageType(selectedFile);

    sendMessage({
      message: selectedFile || data.message,
      type,
    });

    reset();
    setSelectedFile(null);
  };
  // ✅ Ask for microphone permission ONCE
  const askForMicPermission = async () => {
    if (micPermission) return true;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop());
      setMicPermission(true);
      return true;
    } catch (err) {
      alert("من فضلك فعّل إذن الميكروفون للتسجيل الصوتي 🎙️");
      return false;
    }
  };
  // Recording
  const startRecording = async () => {
    const allowed = await askForMicPermission();
    if (!allowed) return;
    try {
      // setValue({ message: "", file: null });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      setRecordingTime(0);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        stopTimer();
      };

      mediaRecorder.start();
      startTimer();
      setIsRecording(true);
      setIsPaused(false);
    } catch (err) {
      console.error("Microphone access denied", err);
    }
  };

  const pauseRecording = () => {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state === "recording") {
      recorder.pause();
      setIsPaused(true);
      stopTimer();
    }
  };

  const resumeRecording = () => {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state === "paused") {
      recorder.resume();
      setIsPaused(false);
      startTimer();
    }
  };

  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== "inactive") {
      recorder.stop();
      setIsRecording(false);
      stopTimer();
    }
  };

  const cancelRecording = () => {
    stopRecording();
    setAudioBlob(null);
    setRecordingTime(0);
    setIsRecording(false);
    setIsPaused(false);
  };

  // Timer
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setRecordingTime((t) => t + 1);
    }, 1000);
  };
  const stopTimer = () => clearInterval(timerRef.current);

  useEffect(() => () => stopTimer(), []);

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
      2,
      "0"
    )}`;
  console.log(errors);

  return (
    <div className="container">
      <div className="community-chat-window">
        <div className="chat-window">
          {/* ===== Header ===== */}
          <div className="chat-window__info">
            <RoundedBackButton onClick={() => navigate(-1)}>
              {lang === "ar" ? (
                <i className="fa-solid fa-angle-right"></i>
              ) : (
                <i className="fa-solid fa-angle-left"></i>
              )}
            </RoundedBackButton>

            <h4 className="chat-window__name">{t("chats")}</h4>
          </div>

          <div className="chat-window__hint">
            <p>هذه محادثة جماعية، رسائلك مرئية للجميع</p>
          </div>

          {/* ===== Messages ===== */}
          <div className="chat-window__messages">
            <InfiniteScroll
              onLoadMore={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            >
              {allChats.map((chat) => (
                <Message
                  key={chat.id}
                  from={chat.user_id === chat.community_id ? "self" : "other"}
                  text={chat.message}
                  time={chat.created_at}
                  avatar={
                    chat.user_id === chat.community_id
                      ? "https://avatar.iran.liara.run/public/42"
                      : "https://avatar.iran.liara.run/public/1"
                  }
                />
              ))}

              {(isLoading || isFetchingNextPage) &&
                [1, 2, 3].map((i) => (
                  <div key={i}>
                    <p>loading.......................</p>
                  </div>
                ))}
            </InfiniteScroll>
          </div>

          {/* ===== Footer Form ===== */}
          <form
            className="chat-window__footer"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="preview-section">
              {" "}
              {isRecording ? (
                <div className={`recording-bar ${isPaused ? "paused" : ""}`}>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={cancelRecording}
                  >
                    <i className="fa-solid fa-trash"></i>
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
                <>
                  <input
                    type="text"
                    placeholder="اكتب رسالتك هنا..."
                    {...register("message")}
                  />
                </>
              )}
            </div>

            <div className="chat-actions">
              <label htmlFor="fileInput">
                <i className="fa-solid fa-paperclip"></i>
              </label>
              <input
                id="fileInput"
                type="file"
                hidden
                {...register("file")}
                onChange={(e) => setSelectedFile(e.target.files[0])}
              />
              <button type="button" onClick={startRecording}>
                <i className="fa-solid fa-microphone"></i>
              </button>
              <button type="submit" className="chat-window__footer--send">
                <i className="fa-solid fa-paper-plane"></i>
              </button>{" "}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
