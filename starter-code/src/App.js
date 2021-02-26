import './App.css';
import users from './users.json'

class App extends React.Component {

    constructor() {
        this.state = {
            users: users,
            search: '',
            student: true,
            teacher: true,
            campus: '',
            query: ''
        }
    }

    handleInputChange = e => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    render (){

        const options = [...new Set (users.map(user => user.campus))].map(campus => {
            return <option value={campus} key={campus}>{campus}</option>
        })

        const filteredUsers = users.filter(user => {
            return this.state[user.role]
                && `${user.firsName}${user.lastName}`.toLowerCase().includes(this.state.search.toLowerCase())
                && ((user.campus === this.state.campus) || !this.state.campus)
        })

        const userList = filteredUsers.map((user, index) => {
            return <tr key={index}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.campus}</td>
                <td>{user.role}</td>
                <td>{user.linkedin &&
                    <a href={user.linkedin}><img src='./linkedin.png' alt="linkedin-logo" style={{height:'18px'}} /></a>}
                </td>
            </tr>
        })

        return (
            <div className="App">
                <h2>IronBook</h2>
                <form>
                    <label htmlFor="name" ></label>
                        <input
                            type="text"
                            value={this.state.search}
                            onChange={this.handleInputChange}
                            placeholder='Search'
                        />
                    <label>
                        Student
                        <input
                            name="student"
                            checked={this.state.student}
                            onChange={this.handleInputChange}
                        />
                    </label>
                    <label>
                        Teacher
                        <input
                            name="teacher"
                            checked={this.state.teacher}
                            onChange={this.handleInputChange}
                        />
                    </label>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Campus</th>
                            <th>Role</th>
                            <th>Links</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.users.map((user) => {
                        return (
                            <tr>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.campus}</td>
                                <td>{user.role}</td>
                                <td>{user.linkedin &&
                                <a href={user.linkedin}><img src='./linkedin.png' alt="linkedin-logo" style={{height:'18px'}} /></a>}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
        </div>
        );
    }
}

export default App;
