import * as THREE from 'three';
import { VectorUtil } from '../../Util/VectorUtil.js';

export class Controller {
	// Controller Constructor
	constructor(doc, camera) {
		this.doc = doc;
		this.left = false;
		this.right = false;
		this.forward = false;
		this.backward = false;


		this.doc.addEventListener('keydown', this);
		this.doc.addEventListener('keyup', this);
	
		this.camera = camera;

		this.setWorldDirection();
	}

	handleEvent(event) {
		if (event.type == 'keydown') {
			switch (event.code) {
				case("KeyW"): 
					this.forward = true;
					break;
				case("KeyS"):
					this.backward = true;
					break;
				case("KeyA"):
					this.left = true;
					break;
				case("KeyD"):
					this.right = true;
					break;
			}
	
		}
		else if (event.type == 'keyup') {
			switch (event.code) {
				case("KeyW"): 
					this.forward = false;
					break;
				case("KeyS"):
					this.backward = false;
					break;
				case("KeyA"):
					this.left = false;
					break;
				case("KeyD"):
					this.right = false;
					break;
			}
		}

	}
	
	destroy() {
		this.doc.removeEventListener('keydown', this);
		this.doc.removeEventListener('keyup', this);
	}

	moving() {
		if (this.left || this.right || this.forward || this.backward)
			return true;
		return false;
	}

	setWorldDirection() {
		this.worldDirection = new THREE.Vector3();
		this.camera.getWorldDirection(this.worldDirection);
 		this.worldDirection.y = 0;
	}

	direction() {
		
		// let angleOffset = this.angleOffset();
		// let direction = this.worldDirection.clone();
		
		// direction.normalize();
		// direction.applyAxisAngle(new THREE.Vector3(0,1,0), angleOffset);
        
       	// return direction;
		   let direction = new THREE.Vector3();

		   if (this.left) {
			   direction.x = -1;
		   }
		   if (this.right) {
			   direction.x = 1;
		   }
   
		   if (this.forward) {
			   direction.z = -1;
		   }
		   if (this.backward) {
			   direction.z = 1;
		   }
   
		   return direction;
	}

  	angleOffset() {
        let angleOffset = 0; // forward

        if (this.forward) {
            if (this.left) {
                angleOffset = Math.PI / 4 // forward+left
            } else if (this.right) {
                angleOffset = - Math.PI / 4 // forward+right
            } else {
            	
            }
        } else if (this.backward) {
            if (this.left) {
                angleOffset = 3 * Math.PI / 4 // backward+left
            } else if (this.right) {
                angleOffset = - 3 * Math.PI / 4 // backward+right
            } else {
                angleOffset = Math.PI // backward
            }
        } else if (this.left) {
            angleOffset = Math.PI / 2 // left
        } else if (this.right) {
            angleOffset = - Math.PI / 2 // right
        }

        return angleOffset
    }


}
