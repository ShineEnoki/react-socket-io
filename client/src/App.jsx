import { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:3000');



const App = () => {
    const [message, setMessage] = useState('');

    const [messageReceived, setMessageReceived] = useState('');

    const [room, setRoom] = useState('');

    const joinRoom = () => {
        if (room !== '') {
            socket.emit('join_room', room)
        }
    }

    const sendMessage = () => {
        socket.emit('send_message', { message, room })
    }
    useEffect(() => {
        socket.on('receive_message', data => {
            console.log(data.message)
            setMessageReceived(data.message)
        })
    }, [])
    return (
        <div>
            <div>
                <input type="text" placeholder="Room" value={room} onChange={(e) => setRoom(e.target.value)} />
                <button onClick={() => joinRoom()}>  Join Room</button>
            </div>

            {/* Send message */}
            <div>
                <input type="text" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
                <button onClick={() => sendMessage()}>  Send message</button>
            </div>


            <div>
                <h1> Message Received :</h1>
                <p> {messageReceived} </p>
            </div>
        </div>
    )
}

export default App
