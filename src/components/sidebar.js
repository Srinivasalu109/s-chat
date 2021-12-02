import SearchIcon from '@material-ui/icons/Search';
import { useState, useEffect } from 'react';
import "../styles/sidebar.css"
export const Sidebar = ({ users, handleusers, userId, handleChange }) => {
    const [newUsers, setNewUsers] = useState([])
    console.log(userId)
    useEffect(() => {
        users = users.filter(user => user._id !== userId)
        setNewUsers(users)
    }, [users])
    return <div className="drawer">
        <div className="menusearch">
            <div>
                <SearchIcon className="searchicon" />
            </div>
            <div>
                <input placeholder="Search here..." className="searchuser" onChange={handleChange} />
            </div>
        </div>
        <h4 className="chats">YOUR CHATS</h4>
        <div className="scroll">
            {
                newUsers?.map((user, index) => <div
                    key={index}
                    className="user"
                    onClick={() => handleusers(user.name, user._id)}>
                    {user.name}</div>)
            }
            {/* <h4 className="user">hello</h4>
                <h4 className="user">hello</h4> */}
        </div>

    </div>
}