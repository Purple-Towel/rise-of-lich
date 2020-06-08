import React, { Component } from "react";
import "./Tutorial.css";

class Tutorial extends Component {
    render() {
        return (
            <div>
                <h1>Tutorial</h1>
                <div class="grid2x3">
                    <img src="assets/empty.png"/>
                    <img src="assets/up_arr.png"/>
                    <img src="assets/empty.png"/>
                    <img src="assets/left_arr.png"/>
                    <img src="assets/down_arr.png"/>
                    <img src="assets/right_arr.png"/>
                </div>
                <p>Movement: You may press any of the above indicated keys to move the character in the corresponding direction. Moving takes Stamina, and once you reach 0 Stamina you will game over.</p>
            </div>
        )
    }
}

export default Tutorial;