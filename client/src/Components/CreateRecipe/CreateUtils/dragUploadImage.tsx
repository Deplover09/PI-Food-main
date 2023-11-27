import { useRef, useState } from "react";
import styles from "../CreateRecipe.module.css";
import { type recipeFormState } from "./CreateForm";
import UploadImage from "./uploadImage";

interface DragDropFilesProps {
  File: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  input: recipeFormState;
  setInput: React.Dispatch<React.SetStateAction<recipeFormState>>;
}

const DragDropFiles: React.FC<DragDropFilesProps> = ({
  File,
  setFile,
  input,
  setInput
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isImageValid, setIsImageValid] = useState<boolean | null>(null);

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
      if (droppedFile !== null) {
        UploadImage(droppedFile).then((result: string | undefined) => {
          console.log(result);
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
  const handleUrlInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const imageUrl = e.target.value;
    console.log(typeof e.target.value);

    if (e.target.value === "") {
      console.log("si");
      setIsImageValid(null);
      setInput({
        ...input,
        image: imageUrl
      });
      return undefined;
    }

    // Create a new Image object
    const img = new Image();

    // Set up event handlers for successful load and error
    img.onload = () => {
      setIsImageValid(true);
    };

    img.onerror = () => {
      setIsImageValid(false);
    };

    // Set the image source to the provided URL
    img.src = imageUrl;

    // Update the input state
    setInput({
      ...input,
      image: imageUrl
    });
  };

  if (input.image !== "" && isImageValid === true) {
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
        <img
          className={styles.urlImg}
          src={URL.createObjectURL(File)}
          alt="a ver si esta"
        />
        <p className={styles.urlImgP}>{`${File.name}`}</p>
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
    <div className={styles.imageContainer}>
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
        className={styles.urlImgInput}
        type="text"
        value={input.image}
        name={"image"}
        autoComplete="off"
        onChange={(e) => {
          handleUrlInputChange(e);
        }}
      />
      {isImageValid === false && (
        <p className={styles.danger}>Image url is not valid</p>
      )}
    </div>
  );
};

export default DragDropFiles;
