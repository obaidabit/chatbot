import React from 'react'
import { useState, useEffect } from 'react' 
import Msg from './Msg'
import {AiOutlineClose} from 'react-icons/ai'
import {MdSend} from 'react-icons/md'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Load from "./Load.js"


function Chat(props){
    const [startDate,setStartDate] = useState(false)
    const [msg,setMsg] = useState([{sender : "chatbot",side : "left",msg : props.value.p,appointments : false}])
    const [MSubmit,setSubmit] = useState(false)
    const [appo,setAppo] = useState([])
    const [isLoading,setLoading] = useState(false)

    const {language,show} = props

    useEffect(() => {
        const box = document.querySelector(".chat .msg-box")
        box.scrollTop +=1000
    },[msg,isLoading])

    function MsgSubmit(e){
        e.preventDefault()   
        setSubmit(true)
        let MsgText = ''
        MsgText = e.target[0].value
        let length = msg.length
        console.log(new Date(startDate).toDateString())
        if(!MsgText ){
            if (length > 3 && msg[length - 1].appointments === true){
                setTimeout(() => {
                    setLoading(true)
                    setTimeout(() => {
                        setLoading(false)
                        setMsg(oldMsg => [...oldMsg,{sender : "chatbot",side : "left",msg : `Are you sure you want to book an appointment today ${new Date(startDate).toISOString().slice(0,10)} ? ` ,appointments : false}])
                        setMsg(oldMsg => [...oldMsg,{sender : "chatbot",side : "left",msg : `Please answer with Yes or No ` ,appointments : false}])
                    }, 500);
                }, 500);
            }
        } 
        else if(MsgText.toLowerCase() === "yes" && msg[length - 3].appointments === true){
                console.log("yes")
                setMsg(oldMsg => [...oldMsg,{sender : "user",side : "right",msg : MsgText ,appointments : false}])
                botResponse(new Date(startDate).toDateString(),"appo")
            }
        else if(MsgText.toLowerCase() === "no"  && msg[length -3].appointments === true){
                console.log("no")
                setMsg(oldMsg => [...oldMsg,{sender : "user",side : "right",msg : MsgText ,appointments : false}])
                setTimeout(() => {
                    setLoading(true)
                    setTimeout(() => {
                        setLoading(false)
                        setMsg(oldMsg => [...oldMsg,{sender : "chatbot",side : "left",msg : "thanks for answer" ,appointments : false}])
                    }, 500);
                }, 500);
            }
        else{
            setMsg(oldMsg => [...oldMsg,{sender : "user",side : "right",msg : MsgText ,appointments : false}])
            botResponse(MsgText,"None")
    }  
    e.target[0].value = ''
    }

    async function botResponse(text,state){
        try{
            setLoading(true)
            fetch("/get", 
            {   method : 'POST',
                headers : {'Content-Type' : 'application/json'},
                body: JSON.stringify({ msg: text, language: language,state:state })
            }).then(function(response){
                return response.json()
            }).then(function(data){
                console.log(data)
                setTimeout(() => {
                    setLoading(false)
                    setMsg(oldMsg => [...oldMsg,{sender : "chatbot" , side : "left" , msg:data.msg ,appointments : false}])
                    
                    if(data.data.tag === "appoitment"){
                        setLoading(true)
                        setStartDate(new Date())
                        setTimeout(() => {
                            for(const date of data.data.appointments){
                                setAppo(oldAppo => [...oldAppo,new Date(date.date)])
                            }
                            setLoading(false)
                            setMsg(oldMsg => [...oldMsg,{sender : "chatbot" , side : "left" , msg:"Please select the date from the calendar and then press the send button " ,appointments : true}])
                        },500)
                    }
                }, 500);
            }) 
            
        }catch(e){
            console.log(e.massage)
        }
    }  

    function close(e) { 
        show()
        setMsg([{sender:"chatbot",side:"left",msg:props.value.p,appointments : false}])
        }

    return(
    <div className = "chat" data-show = "false">
        <header>
            <h4>{props.value.h4}</h4>
            <a className = 'close' onClick = {close} > < AiOutlineClose /> </a>
        </header>
        <div id = "msg-box" className = 'msg-box'>
            {
                MSubmit?msg.map((e,key)=>{return (
                    
                    <div key = {key}>
                    <Msg side = {e.side}  sender = {e.sender} msg = {e.msg}   />
                    <style>
                        {`
                        .react-datepicker {margin: 5px 0 10px;}
                        .react-datepicker__day-name,.react-datepicker__day,.react-datepicker__time-name 
                            { margin: 0.166px;}
                            .react-datepicker__header { background-color: #9ba4b4;}
                        `
                        }
                    </style>
                    {
                    e.appointments?
                        <DatePicker
                            dateFormat = "yyyy-MM-dd"
                            selected = {startDate}
                            selectsEnd
                            onChange = {(date) =>{setStartDate(date)}}
                            excludeDates = {appo}
                            inline
                        />
                    :""
                    }
                    </div>
                )}):msg.map((e,key)=>{return (
                    <div key = {key}>
                    <Msg side = {e.side}  sender = {e.sender} msg = {props.value.p}   />
                    </div>
                )})
            }
            {isLoading?<Msg side = "left" sender = "chatbot" msg = {<Load/>} tag = "Load"/> :""}
        </div>
        <form className = 'msg-form' onSubmit = {MsgSubmit}>
            <input className = "msg-content" type = "text" placeholder = {props.value.input}></input> 
            <button className = "msg-submit" type = 'submit'>< MdSend /></button>
        </form>
    </div>)
}

export default Chat;