import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FileUploader, { FileUtils } from "./FileUPloader";

// Mock react-i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

// Mock react-dropzone
vi.mock("react-dropzone", () => ({
  useDropzone: ({ onDrop, multiple }) => ({
    getRootProps: () => ({
      "data-testid": "dropzone",
      onClick: vi.fn(),
    }),
    getInputProps: () => ({
      "data-testid": "file-input",
    }),
    isDragActive: false,
    open: vi.fn(),
  }),
}));

describe("FileUtils", () => {
  describe("toArray", () => {
    it("should convert single value to array", () => {
      expect(FileUtils.toArray("test")).toEqual(["test"]);
    });

    it("should return array as is", () => {
      expect(FileUtils.toArray([1, 2, 3])).toEqual([1, 2, 3]);
    });

    it("should return empty array for null/undefined", () => {
      expect(FileUtils.toArray(null)).toEqual([]);
      expect(FileUtils.toArray(undefined)).toEqual([]);
    });
  });

  describe("normalizeFile", () => {
    it("should normalize File object", () => {
      const file = new File(["content"], "test.jpg", { type: "image/jpeg" });
      const normalized = FileUtils.normalizeFile(file);

      expect(normalized.type).toBe("file");
      expect(normalized.data).toBe(file);
      expect(normalized.name).toBe("test.jpg");
      expect(normalized.mimeType).toBe("image/jpeg");
    });

    it("should normalize URL string", () => {
      const url = "https://example.com/image.png";
      const normalized = FileUtils.normalizeFile(url);

      expect(normalized.type).toBe("url");
      expect(normalized.data).toBe(url);
      expect(normalized.name).toBe("image.png");
      expect(normalized.mimeType).toBe("image/png");
    });

    it("should normalize object format {id, file}", () => {
      const obj = { id: "123", file: "https://example.com/video.mp4" };
      const normalized = FileUtils.normalizeFile(obj);

      expect(normalized.type).toBe("object");
      expect(normalized.data).toBe(obj.file);
      expect(normalized.id).toBe("123");
      expect(normalized.mimeType).toBe("video/mp4");
      expect(normalized.originalObject).toBe(obj);
    });

    it("should return null for invalid input", () => {
      expect(FileUtils.normalizeFile(null)).toBeNull();
      expect(FileUtils.normalizeFile({})).toBeNull();
    });
  });

  describe("getMimeTypeFromUrl", () => {
    it("should detect image types", () => {
      expect(FileUtils.getMimeTypeFromUrl("test.jpg")).toBe("image/jpeg");
      expect(FileUtils.getMimeTypeFromUrl("test.png")).toBe("image/png");
      expect(FileUtils.getMimeTypeFromUrl("test.gif")).toBe("image/gif");
    });

    it("should detect video types", () => {
      expect(FileUtils.getMimeTypeFromUrl("test.mp4")).toBe("video/mp4");
      expect(FileUtils.getMimeTypeFromUrl("test.webm")).toBe("video/webm");
    });

    it("should return default for unknown types", () => {
      expect(FileUtils.getMimeTypeFromUrl("test.xyz")).toBe(
        "application/octet-stream"
      );
    });
  });

  describe("isImage", () => {
    it("should detect image files", () => {
      const normalized = FileUtils.normalizeFile("test.jpg");
      expect(FileUtils.isImage(normalized)).toBe(true);
    });

    it("should return false for non-images", () => {
      const normalized = FileUtils.normalizeFile("test.mp4");
      expect(FileUtils.isImage(normalized)).toBe(false);
    });
  });

  describe("isVideo", () => {
    it("should detect video files", () => {
      const normalized = FileUtils.normalizeFile("test.mp4");
      expect(FileUtils.isVideo(normalized)).toBe(true);
    });

    it("should return false for non-videos", () => {
      const normalized = FileUtils.normalizeFile("test.jpg");
      expect(FileUtils.isVideo(normalized)).toBe(false);
    });
  });

  describe("shortName", () => {
    it("should not shorten names under max length", () => {
      expect(FileUtils.shortName("short.jpg")).toBe("short.jpg");
    });

    it("should shorten long names", () => {
      const longName = "this_is_a_very_long_filename_that_needs_shortening.jpg";
      const shortened = FileUtils.shortName(longName);
      expect(shortened).toContain("…");
      expect(shortened.length).toBeLessThan(longName.length);
    });
  });

  describe("areFilesEqual", () => {
    it("should return true for equal files", () => {
      const files1 = [
        { id: "1", type: "url" },
        { id: "2", type: "url" },
      ];
      const files2 = [
        { id: "1", type: "url" },
        { id: "2", type: "url" },
      ];
      expect(FileUtils.areFilesEqual(files1, files2)).toBe(true);
    });

    it("should return false for different files", () => {
      const files1 = [{ id: "1" }];
      const files2 = [{ id: "2" }];
      expect(FileUtils.areFilesEqual(files1, files2)).toBe(false);
    });

    it("should return false for different lengths", () => {
      const files1 = [{ id: "1" }];
      const files2 = [{ id: "1" }, { id: "2" }];
      expect(FileUtils.areFilesEqual(files1, files2)).toBe(false);
    });
  });
});

describe("FileUploader Component", () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render with label and hint", () => {
      render(
        <FileUploader
          label="Upload Files"
          hint="Max 5MB"
          onFilesChange={vi.fn()}
        />
      );

      expect(screen.getByTestId("file-uploader-label")).toBeInTheDocument();
      expect(screen.getByText("Upload Files")).toBeInTheDocument();
      expect(screen.getByText("(Max 5MB)")).toBeInTheDocument();
    });

    it("should render dropzone in single mode when no files", () => {
      render(<FileUploader multiple={false} onFilesChange={vi.fn()} />);
      expect(screen.getByTestId("dropzone-single")).toBeInTheDocument();
    });

    it("should render dropzone in multiple mode", () => {
      render(<FileUploader multiple={true} onFilesChange={vi.fn()} />);
      expect(screen.getByTestId("dropzone-multiple")).toBeInTheDocument();
    });
  });

  describe("Edit Mode - Initial Files", () => {
    it("should initialize with File objects", async () => {
      const file = new File(["content"], "test.jpg", { type: "image/jpeg" });
      render(<FileUploader files={[file]} onFilesChange={vi.fn()} />);

      await waitFor(() => {
        expect(screen.getByTestId("uploaded-file-0")).toBeInTheDocument();
      });
    });

    it("should initialize with URL strings", async () => {
      const url = "https://example.com/image.png";
      render(<FileUploader files={[url]} onFilesChange={vi.fn()} />);

      await waitFor(() => {
        expect(screen.getByTestId("uploaded-file-0")).toBeInTheDocument();
      });
    });

    it("should initialize with object format", async () => {
      const files = [
        { id: "123", file: "https://example.com/image1.png" },
        { id: "456", file: "https://example.com/image2.png" },
      ];
      render(<FileUploader files={files} onFilesChange={vi.fn()} />);

      await waitFor(() => {
        expect(screen.getByTestId("uploaded-file-0")).toBeInTheDocument();
        expect(screen.getByTestId("uploaded-file-1")).toBeInTheDocument();
      });
    });

    it("should handle mixed formats", async () => {
      const file = new File(["content"], "test.jpg", { type: "image/jpeg" });
      const files = [
        file,
        "https://example.com/image.png",
        { id: "123", file: "https://example.com/video.mp4" },
      ];
      render(<FileUploader files={files} onFilesChange={vi.fn()} />);

      await waitFor(() => {
        expect(screen.getByTestId("uploaded-file-0")).toBeInTheDocument();
        expect(screen.getByTestId("uploaded-file-1")).toBeInTheDocument();
        expect(screen.getByTestId("uploaded-file-2")).toBeInTheDocument();
      });
    });
  });

  describe("File Removal", () => {
    it("should remove file when delete button clicked", async () => {
      const onFilesChange = vi.fn();
      const files = ["https://example.com/image.png"];

      render(<FileUploader files={files} onFilesChange={onFilesChange} />);

      await waitFor(() => {
        expect(screen.getByTestId("delete-button-0")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId("delete-button-0"));

      expect(onFilesChange).toHaveBeenCalledWith([]);
    });

    it("should call onDelete with ID for object format", async () => {
      const onDelete = vi.fn();
      const onFilesChange = vi.fn();
      const files = [{ id: "123", file: "https://example.com/image.png" }];

      render(
        <FileUploader
          files={files}
          onDelete={onDelete}
          onFilesChange={onFilesChange}
        />
      );

      await waitFor(() => {
        expect(screen.getByTestId("delete-button-0")).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId("delete-button-0"));

      expect(onDelete).toHaveBeenCalledWith("123");
      expect(onFilesChange).toHaveBeenCalledWith([]);
    });
  });

  describe("Preview Rendering", () => {
    it("should render image preview", async () => {
      const files = ["https://example.com/image.png"];
      render(<FileUploader files={files} onFilesChange={vi.fn()} />);

      await waitFor(() => {
        expect(screen.getByTestId("file-image-0")).toBeInTheDocument();
      });
    });

    it("should render video preview", async () => {
      const files = ["https://example.com/video.mp4"];
      render(<FileUploader files={files} onFilesChange={vi.fn()} />);

      await waitFor(() => {
        expect(screen.getByTestId("file-video-0")).toBeInTheDocument();
      });
    });

    it("should render fallback for unknown types", async () => {
      const files = ["https://example.com/document.pdf"];
      render(<FileUploader files={files} onFilesChange={vi.fn()} />);

      await waitFor(() => {
        expect(screen.getByTestId("file-fallback-0")).toBeInTheDocument();
      });
    });
  });
});
