import { Image } from "@tiptap/extension-image";
import $axios from "@/_api/axios";
import { toast } from "react-toastify";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


const MAX_SIZE = 10 * 1024 * 1024;

export const ImageUploadExtension = Image.extend({
  addCommands() {
    return {
      setImage:
        (options) =>
        async ({ editor, commands }) => {
          let src = options.src;

      
          commands.insertContent({
            type: "image",
            attrs: { src },
          });

       
          if (!src.startsWith("data:image")) return true;

          try {
           
            const blob = await fetch(src).then((r) => r.blob());

        
            if (blob.size > MAX_SIZE) {
              toast.error("Image must be smaller than 10MB!");
              
             
              editor.commands.deleteSelection();
              
              return false;
            }

            const fd = new FormData();
            fd.append("file", blob, "editor-blog-img.webp");

            const res = await $axios.post("/v1/media/image", fd);

            const finalURL = BASE_URL + res.data.path;

    
            editor
              .chain()
              .focus()
              .updateAttributes("image", { src: finalURL })
              .run();

            toast.success("Image uploaded successfully!");

            return true;
          } catch (err) {
            console.error("Image upload failed:", err);

            const backendMsg =
              err?.response?.data?.message ||
              err?.message ||
              "Image upload failed";

            toast.error(backendMsg);

            return false;
          }
        },
    };
  },
});
