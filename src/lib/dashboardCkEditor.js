import {
  Bold,
  ClassicEditor,
  Essentials,
  Heading,
  Image,
  ImageCaption,
  ImageResize,
  ImageStyle,
  ImageToolbar,
  ImageUpload,
  Italic,
  Link,
  MediaEmbed,
  Paragraph,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";

class DashboardCkEditor extends ClassicEditor {}

DashboardCkEditor.builtinPlugins = [
  Essentials,
  Paragraph,
  Heading,
  Bold,
  Italic,
  Link,
  Image,
  ImageToolbar,
  ImageCaption,
  ImageStyle,
  ImageResize,
  ImageUpload,
  MediaEmbed,
];

export default DashboardCkEditor;
