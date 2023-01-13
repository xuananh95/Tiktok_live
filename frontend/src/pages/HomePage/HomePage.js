import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./Homepage.css";
import useWebSocket from "react-use-websocket";
import { toast } from "react-toastify";

const HomePage = ({ user }) => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const [chatMessages, setChatMessages] = useState("");

    // setup websocket to backend
    const WS_URL = "ws://localhost:5001/live";
    const {
        sendMessage,
        sendJsonMessage,
        lastMessage,
        lastJsonMessage,
        readyState,
        getWebSocket,
    } = useWebSocket(WS_URL, {
        onOpen: () => console.log("opened"),
        share: true,
        retryOnError: true,
        shouldReconnect: () => true,
    });

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
            navigate("/signin", { replace: true });
        }
        if (lastMessage !== null) {
            const msg = JSON.parse(lastMessage.data);
            if (msg.type === "Connect") {
                if (msg.msg === "Failed") {
                    toast(msg.payload);
                } else if (msg.msg === "Success") {
                    toast("Kết nối thành công!");
                }
            } else if (msg.type === "chat") {
                const updatedChat = chatMessages + msg.payload.chat + "\n\n";
                setChatMessages(updatedChat);
            }
        }
    }, [lastMessage]);

    const onSubmitRoomID = (data) => {
        sendJsonMessage({
            type: "ROOMID",
            payload: data,
        });
        // reset();
    };

    return (
        <div className="container-fluid mt-3 d-flex flex-column align-items-center">
            <h1>Tiktok Live chat</h1>
            <form onSubmit={handleSubmit(onSubmitRoomID)} className="mt-3 w-80">
                <div className="row g-3 align-items-end">
                    <div className="col-md-4">
                        <label htmlFor="roomID" className="col-form-label">
                            Room ID
                        </label>
                        <input
                            type="text"
                            id="roomID"
                            className="form-control"
                            aria-describedby="passwordHelpInline"
                            {...register("roomID", { required: true })}
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="msgStruc" className="col-form-label">
                            Cú pháp tin nhắn
                        </label>
                        <input
                            type="text"
                            id="msgStruc"
                            className="form-control"
                            aria-describedby="passwordHelpInline"
                            {...register("msgStruc", { required: true })}
                        />
                    </div>
                    <div className="col-md-4">
                        <button type="submit" className="btn btn-primary">
                            Tìm room
                        </button>
                    </div>
                </div>
            </form>
            <div className="container-xxl text-center">
                <div className="row">
                    <div className="col-6">
                        <h4>Live chat</h4>
                    </div>
                    <div className="col-3">
                        <h4>Thống kê</h4>
                    </div>
                    <div className="col-3">
                        <h4>Bảng xếp hạng</h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <textarea
                            id="chatInput"
                            placeholder="Live chat"
                            value={chatMessages}
                            disabled
                            className="form-floating"
                            style={{
                                height: "400px",
                                width: "100%",
                                resize: "none",
                            }}
                        />
                    </div>
                    <div className="col-3">
                        <div className="container-sm">
                            <div className="row">
                                <div className="col-4">User</div>
                                <div className="col-4">Mã SP</div>
                                <div className="col-4">Số lượng</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3">
                        <div className="container-sm">
                            <div className="row">
                                <div className="col-6">User</div>
                                <div className="col-6">Điểm</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
