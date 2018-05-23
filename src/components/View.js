import React, { Component } from 'react';
import 'aframe';
import 'aframe-physics-system';
import 'aframe-environment-component';
import { Entity } from 'aframe-react';

/**
* @summary - The View component return the aframe representation of the scene. This 
* system utilizes the entity compoent system(ECS) to build objects in the scene from different 
* components. 
*/
class View extends Component {

  // This renders json to aframe entities
  helper = (ent, id) => {
    // for now only look one level deep for animations
    var anim, cam;
    if (ent && ent.animation) {
      anim = <a-animation {...ent.animation} />;
    } else {
      anim = null;
    }

    if (ent && ent.camera) {
      if (ent.cursor) {
        cam = <a-camera>
          <a-cursor></a-cursor>
        </a-camera>;
      } else {
        cam = <a-camera />;
      }
      delete ent.camera;
      return <Entity id="cam" key={id} {...ent}>{cam}</Entity>;
    }

    return (
      <Entity key={id} {...ent}>
        {anim}
      </Entity>
    );
  }

  assetsHelper = (asset, i) => {
    return (
      <a-asset-item key={asset.id} id={asset.id} src={asset.src}></a-asset-item>
    );
  }

  render = () => {
    return (
      <a-scene physics="debug: false; friction: 3; restitution: .1" embedded>
        <a-assets>
          {this.props.assets ? this.props.assets.map((x, index) => this.assetsHelper(x, index)) : null}
        </a-assets>
        {/* <a-sky color={this.props.sceneConfig.skyColor} ></a-sky> */}
        {this.props.objects ? this.props.objects.map((x, index) => this.helper(x, index)) : null}
      </a-scene>
    );
  }

  componentDidUpdate() {
    // Create the event
    var event = new CustomEvent("myr-view-rendered");

    // Dispatch/Trigger/Fire the event
    document.dispatchEvent(event);
  }
}

export default View;