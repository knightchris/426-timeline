import react, { useState } from 'react';
import ReactDom from 'react-dom';
import Background from '../img/lightsabers667x575.png'
import '../css/CreateCardModal.css'
import axios from 'axios'
import {store} from "react-notifications-component"

const CREATE_CARD_MODAL_STYLE = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundImage: `url(${Background})`,
    width: '667px',
    height: '575px',
    padding: '20px',
    zIndex: 1000,
    borderRadius: '15px 50px'
}

const OVERLAY_STYLE = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,.95)',
    zIndex: 1000
}



export default function CreateCardModal({children, open, onClose}) {

    if (!open) {
        return null;
    }

    async function handleSubmit (event) {
        event.preventDefault();
        const result = await axios({
            method: 'post',
            url: 'http://localhost:3000/createcard',
            withCredentials: true,
            data: {
              "mediatype": event.target[4].value,
              "title": event.target[0].value,
              "description": event.target[5].value,
              "pubdate": event.target[1].value,
              "unidate": event.target[2].value,
              "creator": event.target[3].value
            },
           }); 
        if (result.data == "You are not logged in") {
            store.addNotification({
                title: "Failure",
                message: "You are not logged in",
                type: "danger",
                container: "top-center",
                insert: "top",
                animationIn: ["animate__animated animate__fadeIn"],
                animationOut: ["animate__animated animate__fadeOut"],
                dismiss: {
                    duration: 2000,
                    showIcon: true
                },
                width:270
            })
        } else if (result.data == "Problem with request parameters") {
            store.addNotification({
                title: "Failure",
                message: "Check field formatting",
                type: "danger",
                container: "top-center",
                insert: "top",
                animationIn: ["animate__animated animate__fadeIn"],
                animationOut: ["animate__animated animate__fadeOut"],
                dismiss: {
                    duration: 2000,
                    showIcon: true
                },
                width:270
            })
        } else {
            store.addNotification({
                title: "Success!",
                message: "Card proposal submitted",
                type: "success",
                container: "top-center",
                insert: "top",
                animationIn: ["animate__animated animate__fadeIn"],
                animationOut: ["animate__animated animate__fadeOut"],
                dismiss: {
                    duration: 2000,
                    showIcon: true
                },
                width:270
            })
            onClose();
        }
    }

    return ReactDom.createPortal (
        <>
        <div style={OVERLAY_STYLE}>
            <div style={CREATE_CARD_MODAL_STYLE}>
                <form onSubmit={handleSubmit}>
                    <div id="create-card-form-fields">
                        <input type="title" name="title" placeholder="Title" required />
                        <input  name="pubdate" placeholder="Publish Date (YYYY-MM-DD)" required />
                        <input  name="unidate" placeholder="Universe Date (YYYY BBY/ABY)" required />
                        <input  name="creator" placeholder="Creator" required />
                        <label htmlFor="medaiatype">Media Type</label>
                        <select name="mediatype" id="mediatype" required>
                            <option value="movie">Movie</option>
                            <option value="television">Television</option>
                            <option value="book">Book</option>
                            <option value="comic">Comic</option>
                        </select>
                        <textarea id="create-card-form-description" name="description" rows="5" cols="50" maxLength="250" placeholder="Description (250 char max)" required />
                    </div>
                    <button type="submit" id="create-card-submit">Submit</button>
                </form>
                <button id="create-card-close" onClick={onClose}>Cancel</button>
            </div>
        </div>
        </>,
        document.getElementById('portal')
    )
}