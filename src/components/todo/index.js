import React, { useState , useRef, useEffect} from "react";
import editIcon from "../../assets/icons/editIcon.png";
import select from "../../assets/icons/completed.png";
import deleteIcon from "../../assets/icons/deleteIcon.png";
import saveIcon from "../../assets/icons/saveIcon.png";
import spinner from "../../assets/icons/spinner.png";
import styles from "./styles.module.css";

export const Todo = ({ title, todoText, onUpdate, onDelete,isLoading , isFocused,onComplete}) => {
  const [isActive, setIsActive] = useState(isFocused || false);
  const [text, setText] = useState(todoText || "");
  const inputRef = useRef();
  useEffect(()=>{
    inputRef.current.focus();
    inputRef.current.selectionStart = text.length;
  }, [isActive])

  return (
    <div className={`${styles.container} ${isActive && styles.active}`}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <span className={styles.titleText}>{title}</span>
        </div>
        <div className={styles.actionsWrapper}>

        <div className={styles.iconWrapper} >
             <img src={select} className={styles.icon} onClick={onComplete}/> 
          </div>
          
          <div
            className={styles.iconWrapper}
            onClick={() => setIsActive(!isActive)}
          >
            {!isActive ? <img src={editIcon}/> : <img src={saveIcon} onClick={onUpdate}/>}
          </div>
          <div className={styles.iconWrapper} onClick={() => onDelete()}>
            <img src={deleteIcon} />
          </div>
        </div>
      </div>
      
      <div className={styles.textInputWrapper}>
        <textarea
          ref={inputRef}
          className={styles.textInput}
          disabled={!isActive}
          rows="7"
          cols="20"
          value={text}
          onChange={(event)=>{setText(event.target.value)}}
        />
      </div>
      {isLoading && <div className={styles.loadingWrapper}>
        
          <img src={spinner} className={styles.spinner}/>
     
      </div>}
    </div>
  );
};
