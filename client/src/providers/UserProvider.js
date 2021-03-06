import React, { Component, createContext } from "react";
import { auth } from "../firebase-config";
import { get } from "../utilities.js";
// https://reactjs.org/docs/context.html
export const UserContext = createContext({
    user : undefined, 
    refreshUser: () => {}
});

class UserProvider extends Component {
    constructor(props) {
        super(props);
        this.refreshUser = this.refreshUser.bind(this);
        this.state = { 
            user: undefined, 
            refreshUser: this.refreshUser
        };
    }

    async refreshUser() {
        const token = this.state.user.token;
        try {
            let user = await get("/api/mentee", { token: token });
            let role = "mentee";

            // if the user is not a student 
            if (user.length == 0) {
                user = await get("/api/mentor", { token: token });
                role = "mentor";
            }

            user = user[0];
            user.role = role;
            user.token = token;
            this.setState({ user: user });

        } catch (err) {
            console.log(err);
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const token = await user.getIdToken();
                    try {
                        let user = await get("/api/mentee", { token: token });
                        let role = "mentee";

                        // if the user is not a student 
                        if (user.length == 0) {
                            user = await get("/api/mentor", { token: token });
                            role = "mentor";
                        }

                        user = user[0];
                        user.role = role;
                        user.token = token;
                        this.setState({ user: user });

                    } catch (err) {
                        console.log(err);
                    }

                } catch (error) {
                    // TODO:handle error
                    console.log(error);
                }
            } else {
                this.setState({ user: undefined });
            }
        });
    }

    render() {
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        )
    }
}

export default UserProvider;

