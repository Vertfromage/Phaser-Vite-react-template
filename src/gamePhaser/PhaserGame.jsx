/***
 * Modified from solution on stackoverflow by Timothy Bushell
 * https://stackoverflow.com/a/71784998
 */

import Phaser from "phaser"
import React, { useEffect, useState } from "react"

/** @tutorial I made this! This answers how you get your image. */
import logoImage from "../assets/react.svg"

/** @tutorial I made this! Use a functional React component and `useEffect` hook.*/
export const Phaser3GameComponent = ({ someState }) => {
  // Optional: useful to delay appearance and avoid canvas flicker.
  const [isReady, setReady] = useState(false)
  // Just an example... do what you do here. 
  const dataService = (changedState) => {
    // I'm not sure how to use stores, but you'll know better what to do here.
    store.dispatch(
      {
        ...someState,
        ...changedState,
      },
      { type: ACTION_TYPE }
    )
  }

  const calculateHeight =()=> {
    var windowHeight = window.innerHeight;
    var divHeight = document.getElementById('nav').clientHeight; // Replace 'myDiv' with your div's ID or modify it for a class
  
    return windowHeight - divHeight;
  }

  // This is where the fun starts. 
  useEffect(() => {
    const config = {
      callbacks: {
        preBoot: game => {
          // A good way to get data state into the game.
          game.registry.merge(someState)
          // This is a good way to catch when that data changes.
          game.registry.events.on("changedata", (par, key, val, prevVal) => {
            // Simply call whatever functions you want outside.
            dataService({ [key]: val })
          })
        },
      },
      type: Phaser.AUTO,
      parent: "phaser-example",
      width: window.innerWidth,
      height: calculateHeight(),
      scene: [ExampleScene],
      physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        },
      },
      scale: {
          mode: Phaser.Scale.FIT, // Resize the game to fit the screen
          autoCenter: Phaser.Scale.CENTER_BOTH, // Center the game horizontally and vertically
          width: window.innerWidth,
          height: calculateHeight()
        }
    }
    let game = new Phaser.Game(config)
    // Triggered when game is fully READY.
    game.events.on("READY", setReady)
    // If you don't do this, you get duplicates of the canvas piling up.
    return () => {
      setReady(false)
      game.destroy(true)
    }
  }, []) // Keep the empty array otherwise the game will restart on every render.
  return (
    <div id="phaser-example" className={isReady ? "visible" : "invisible"} />
  )
}





export default class ExampleScene extends Phaser.Scene {
  preload() {
    this.load.image("logo", logoImage)
    this.load.image('red', 'https://labs.phaser.io/assets/particles/red.png');
  }
  create() {
    // You made this!
    const text = this.add.text(250, 250, "Phaser")
    text.setInteractive({ useHandCursor: true })
    this.add.image(400, 300, "logo")

    const particles = this.add.particles(0, 0, 'red', {
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD'
  });


  const logo = this.physics.add.image(400, 100, 'logo');

  logo.setVelocity(100, 200);
  logo.setBounce(1, 1);
  logo.setCollideWorldBounds(true);

  particles.startFollow(logo);
    /** @tutorial I made this! */
    // Get all that lovely dataState into your scene,
    let { clickCount } = this.registry.getAll()
    text.on("pointerup", () => {
      // This will trigger the "changedata" event handled by the component.
      this.registry.merge({ clickCount: clickCount++ })
    })
    // This will trigger the scene as now being ready.
    this.game.events.emit("READY", true)
  }


}