import React from 'react';
import {useSelector} from 'react-redux';
import "./styles.css";

const Appointment = (user) => {
    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li>
                            {user?.firstName} {user?.lastName}
                        </li>
                    </ul>
                </nav>
            </header>
            <main>
                <div className="appointment">
                    <div className="appointment__info">
                        <h3>{user?.firstName} {user?.lastName}</h3>
                        <p>
                            <span>Date:</span>
                            <span>{user?.date}</span>
                        </p>
                        <p>
                            <span>Time:</span>
                            <span>{user?.time}</span>
                        </p>
                        <p>
                            <span>Service:</span>
                            <span>{user?.service}</span>
                        </p>
                        <p>
                            <span>Description:</span>
                            <span>{user?.description}</span>
                        </p>
                    </div>
                    <div className="appointment__actions">
                        <button className="btn btn--primary">
                            Save
                        </button>
                        <button className="btn btn--secondary">
                            Cancel
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Appointment;
