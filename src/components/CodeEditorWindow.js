import React, { useState } from "react";

import Editor from "@monaco-editor/react";

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAQmHkXoMKGIXlZuqWQGwjCbIRS5w_plJw",
  authDomain: "zoomcodetogether.firebaseapp.com",
  databaseURL: "https://zoomcodetogether-default-rtdb.firebaseio.com",
  projectId: "zoomcodetogether",
  storageBucket: "zoomcodetogether.appspot.com",
  messagingSenderId: "907394230328",
  appId: "1:907394230328:web:74604ad262f6decb171ecd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);



const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");


  const handleEditorChange = (value) => {
    get(ref(db, 'Content/' + language)).then((snapshot) => {
      if (snapshot.exists()) {
        if(snapshot.val() !== value){
          set(ref(db, 'Content/' + language), {
            code: Date().toLocaleString() + value
          });
          setValue(value);
          onChange("code", value);
        }
        else{
          setValue(value);
          onChange("not", value);
        }


      } else {
        set(ref(db, 'Content/' + language), {
          code:Date().toLocaleString() + value
        });
        setValue(value);
        onChange("code", value);
      }
      }).catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="85vh"
        width={`100%`}
        language={language || "javascript"}
        value={value}
        theme={theme}
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </div>
  );
};
export default CodeEditorWindow;
