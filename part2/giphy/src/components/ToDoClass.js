import React from 'react';

class ToDoClass extends React.Component {
    state = {
        toDoInput: '',
        toDoList: [
            'Cycle',
            'Hike',
            'Read a book'
        ]
    }

    componentDidMount = () => {
        console.log("The componenet has mounted")
    }

    componentDidUpdate = () => {
        function tellMeIUpdated() {
            console.log('I have updated')
        }
    }

    addToDo = () => {
        if(!this.state.toDoInput) return;
        this.setState({toDoList: [...this.state.toDoList, this.state.toDoInput]})
    }

    handleChangeInput = (event) => {
        this.setState({toDoInput: event.target.value})
    }

    render() {
        return (
            <div>
                <h2>To DO Class</h2>
                <input value={this.state.toDoInput} onChange={this.handleChangeInput} />
                <button onClick={this.addToDo}>Add To DO</button>
                <ul>
                    {this.state.toDoList.map((item, key) => {
                        return <li key={key}>{item}</li>
                    })}
                </ul>
            </div>
        )
    }
}

export default ToDoClass
