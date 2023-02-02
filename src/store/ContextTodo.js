import {createContext, useReducer, useState, useEffect} from "react"
import { ACTION } from "../components/todo-list/TodoList"


export const ContextTodo = createContext({});

const reduser = (todos, action) =>{
    switch (action.type) {
      case ACTION.ISTODO_ADD:
          return [...todos, newTodo(action.payload.name)]
       case ACTION.ISCOMPLETE_TODO:
          return todos.map((todo)=>{
              if(todo.id === action.payload.id) {
                  return {...todo, complete: !todo.complete };
              }
              return todo;
          })
          case ACTION.ISDELETE_TODO:
              return todos.filter((todo)=> todo.id !== action.payload.id);        
              default:
                  return todos;
    }
  }
  
 const newTodo = (name) =>{
   return {
     id: Math.random() + new Date().getMilliseconds().toString(),
     name: name,
     complete: false
   }
 };

  export const ContextPravider = (props)=>{

    const [title, setTitle] = useState("")
    const [isLocal, setIsLocal] = useState(false)

    useEffect(()=>{
     const result = localStorage.getItem("SOS");
     setIsLocal(Boolean(result))
    },[])
  
      const [todos, dispatch] = useReducer(reduser,[
          {
              id: Math.random() + new Date().getMilliseconds().toString(),
              name: "Amazon",
              complete:false,
          },
      ]);
      const submitHandler = (event)=>{
      event.preventDefault();
      dispatch({ type: ACTION.ISTODO_ADD, payload: { name: title} });
      todos.filter((item)=> item.id === todos.id);
      setTitle("")
       setIsLocal(false)
       localStorage.setItem("SOS", JSON.stringify(true))
      }
       const editHandler = (name, id)=>{
          setTitle(name)
          dispatch({ type: ACTION.ISDELETE_TODO, payload: { id: id} })
          
       };


       const state = {
        title,
        setTitle,
        setIsLocal,
        todos,
        dispatch,
        editHandler,
        submitHandler
       }

       return(
        <ContextTodo.Provider value={state}>{props.children}</ContextTodo.Provider>
       )
 }
