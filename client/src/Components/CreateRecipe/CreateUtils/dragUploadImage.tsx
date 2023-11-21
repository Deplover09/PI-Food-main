import { useRef } from "react";
import styles from "../CreateRecipe.module.css";
import { type recipeFormState } from "./CreateForm";
import UploadImage from "./uploadImage";

interface DragDropFilesProps {
  File: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  input: recipeFormState;
  setInput: React.Dispatch<React.SetStateAction<recipeFormState>>;
}

const DragDropFiles: React.FC<DragDropFilesProps> = ({
  File,
  setFile,
  handleChange,
  input,
  setInput
}) => {
  // const [files, setFiles] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  // const [urlImg, setUrlImg] = useState<string>("");

  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement | HTMLParagraphElement>
  ): void => {
    event.preventDefault();
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement | HTMLParagraphElement>
  ): void => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;

    if (droppedFiles.length > 0) {
      // Assuming you want to handle only the first dropped file
      const droppedFile = droppedFiles[0];

      // Update state or perform further actions with the dropped file
      setFile(droppedFile);
      if (File !== null) {
        UploadImage(File).then((result: string | undefined) => {
          result !== undefined &&
            setInput({
              ...input,
              image: result
            });
        });
      }
    }
  };

  const cancelUrlImage = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setInput({
      ...input,
      image: ""
    });
  };
  if (input.image !== "") {
    return (
      <div className={styles.urlImgDiv}>
        <img className={styles.urlImg} src={input.image} alt="invalid img" />
        <button
          className={styles.cancelBtn}
          onClick={(e) => {
            cancelUrlImage(e);
          }}
        >
          cancel
        </button>
      </div>
    );
  }

  if (File?.name !== null && File?.name !== undefined)
    return (
      <div className={styles.urlImgDiv}>
        <p>{`${File.name}`}</p>
        <img
          className={styles.urlImg}
          src={URL.createObjectURL(File)}
          alt="a ver si esta"
        />
        <div className="actions">
          <button
            onClick={() => {
              setFile(null);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );

  return (
    <div className={styles.subContainer}>
      <div
        className={styles.dropzone}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <p onDragOver={handleDragOver} onDrop={handleDrop}>
          Drag and Drop Files to Upload
        </p>
        <p onDragOver={handleDragOver} onDrop={handleDrop}>
          Or
        </p>
        <input
          type="file"
          hidden
          onChange={(event) => {
            console.log("input");
            console.log(event);
            event.target.files !== null && setFile(event.target.files[0]);
          }}
          accept="image/png, image/jpeg"
          ref={inputRef}
        />
      </div>
      <button
        className={styles.btnSelectImg}
        onClick={(e) => {
          e.preventDefault();
          inputRef.current?.click();
        }}
      >
        Select Files
      </button>
      <p>Or</p>
      <p>Use an Url</p>
      <input
        type="text"
        value={input.image}
        name={"image"}
        autoComplete="off"
        onChange={(e) => {
          handleChange(e);
        }}
      />
    </div>
  );
};

export default DragDropFiles;
