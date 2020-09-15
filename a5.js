
/*** 
 * Sample codes from https://doc.babylonjs.com/
 * 
*/

var canvas = document.getElementById("renderCanvas"); // Get the canvas element 
var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

var createScene = function () {
    // Scene
    var scene = new BABYLON.Scene(engine);

    // Camera
    var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0, 0, 20), scene);
    camera.attachControl(canvas, true);
    
    // Add lights to the scene
    var light_1 = new BABYLON.HemisphericLight("light_1", new BABYLON.Vector3(1, 1, 0), scene);
    var light_2 = new BABYLON.PointLight("light_2", new BABYLON.Vector3(0, 1, -1), scene);

    // Particles
    var particleSystem = new BABYLON.ParticleSystem("particles", 10000, scene);
    particleSystem.particleTexture = new BABYLON.Texture("textures/snowflakes.png", scene);
    particleSystem.emitter = new BABYLON.Vector3(0, 15, 20);
    particleSystem.minEmitBox = new BABYLON.Vector3(-100, 0, -20);
    particleSystem.maxEmitBox = new BABYLON.Vector3(100, 0, 20);
    particleSystem.minScaleX = 0.1;
    particleSystem.maxScaleX = 0.5;
    particleSystem.minScaleY = 0.2;
    particleSystem.maxScaleY = 0.4;
    particleSystem.emitRate = 1000;
    particleSystem.minLifeTime = 0.3;
    particleSystem.maxLifeTime = 5;
    particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);

    // Start the particle system
    particleSystem.start();

    // Add background 
    var background = BABYLON.MeshBuilder.CreateBox("background", {size:1000.0}, scene);
    var background_Material = new BABYLON.StandardMaterial("background", scene);
    background_Material.backFaceCulling = false;
    background_Material.reflectionTexture = new BABYLON.CubeTexture("textures/forest", scene);
    background_Material.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    background_Material.diffuseColor = new BABYLON.Color3(0, 0, 0);
    background_Material.specularColor = new BABYLON.Color3(0, 0, 0);
    background.material = background_Material;	

    // Sound
    var volume = 0.5;
    var sound_b = new BABYLON.Sound("sound_b", "music/sound_b.mp3", scene, null, {volume: volume});
    var sound_a = new BABYLON.Sound("sound_a", "music/sound_a.mp3", scene, null, {volume: volume});

    // Initial setup for letter object
    var letter_box;
    var keyDown = false;
    var count = 0;

    var box_list = [];
    var lines = [];
    var second_box_list = [];
    var second_lines = [];

    // Text Button
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
    var button_1 = BABYLON.GUI.Button.CreateSimpleButton("but", "Click the screen once and start typing! (up to 20 letters!)");
    button_1.width = "500px";
    button_1.height = "25px";
    button_1.color = "white";
    button_1.top = "-250px";
    button_1.background = "black";

    var button_2 = BABYLON.GUI.Button.CreateSimpleButton("resetBut", "Backspace to reset!");
    button_2.width = "300px";
    button_2.height = "25px";
    button_2.color = "white";
    button_2.top = "-220px";
    button_2.background = "black";

    var button_3;

    advancedTexture.addControl(button_1);
    advancedTexture.addControl(button_2);

    scene.actionManager = new BABYLON.ActionManager(scene);
    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function(evt) {
        var key = evt.sourceEvent.key;
        if (keyDown == false) {
                if (/^[a-zA-Z ]/.test(key) && key.length == 1 && count < 20) {
                        var material = new BABYLON.StandardMaterial("mat", scene);
                        var texture = new BABYLON.Texture(`font/${key.toUpperCase()}.png`, scene);
                        material.diffuseTexture = texture;
                            
                        // alien sprite
                        var faceUV = new Array(6);
                            
                        // faces for the cube
                        for (var i = 0; i < 6; i++) {
                            faceUV[i] = new BABYLON.Vector4(0, 0, 0, 0);
                        }
                        faceUV[0] = new BABYLON.Vector4(1, 1, 0, 0);
                        var options = {
                            faceUV: faceUV
                        };
                        
                        // Setting a new letter box
                        letter_box = BABYLON.MeshBuilder.CreateBox('box', options, scene);
                        letter_box.material = material;
                        letter_box.position.x = 0;
                        if (count < 13) {
                                letter_box.position.y =  Math.floor(Math.random() * 3) + 1;
                        } else {
                                letter_box.position.y =  Math.floor(Math.random() * 2) - 4;
                        }

                        //letter_box.position.y = Math.floor(Math.random() * 10) - 5

                        keyDown = true;

                        var path = [new BABYLON.Vector3(letter_box.position.x, letter_box.position.y, 0),
                                new BABYLON.Vector3(letter_box.position.x, 1000, 0)]; 
                        var line = BABYLON.Mesh.CreateLines("lines", path, scene); // Draw line

                        if (count < 13) {
                                box_list.push(letter_box);
                                lines.push(line);
                        } else {
                                second_box_list.push(letter_box);
                                second_lines.push(line);
                        }

                        // Adujusting the position of the boxes
                        if (count != 0 && count < 13) {
                                for (var i = 0; i < lines.length; i++) {
                                        lines[i].dispose();
                                }
                                lines.splice(0, lines.length);

                                var center = Math.floor(box_list.length / 2);
                                box_list[center].position.x = 0;
                                for (var i = 0; i < center; i++) {
                                        box_list[i].position.x = 0 + ((center - i) * 2);
                                }
                                for (var i = center + 1; i < box_list.length; i++) {
                                        box_list[i].position.x = 0 - ((i - center) * 2);
                                }

                                for (var i = 0; i < box_list.length; i++) {
                                        
                                        var path = [new BABYLON.Vector3(box_list[i].position.x, box_list[i].position.y, 0),
                                                new BABYLON.Vector3(box_list[i].position.x, 1000, 0)]; 
                                        var line = BABYLON.Mesh.CreateLines("lines", path, scene); // Draw line
                                        lines.push(line);
                                }
                        } else if (count != 0 && count >= 13) {
                                for (var i = 0; i < second_lines.length; i++) {
                                        second_lines[i].dispose();
                                }
                                second_lines.splice(0, second_lines.length);

                                var center = Math.floor(second_box_list.length / 2);
                                second_box_list[center].position.x = 0;
                                for (var i = 0; i < center; i++) {
                                        second_box_list[i].position.x = 0 + ((center - i) * 2);
                                }
                                for (var i = center + 1; i < second_box_list.length; i++) {
                                        second_box_list[i].position.x = 0 - ((i - center) * 2);
                                }

                                for (var i = 0; i < second_box_list.length; i++) {
                                        var path = [new BABYLON.Vector3(second_box_list[i].position.x, second_box_list[i].position.y, 0),
                                                new BABYLON.Vector3(second_box_list[i].position.x, 1000, 0)]; 
                                        var line = BABYLON.Mesh.CreateLines("lines", path, scene); // Draw line
                                        second_lines.push(line);
                                }
                        }
                        sound_b.play();
                        count++;

                        button_3 = BABYLON.GUI.Button.CreateSimpleButton("countBut", count.toString());
                        button_3.width = "100px";
                        button_3.height = "25px";
                        button_3.color = "white";
                        button_3.top = "-250px";
                        button_3.left = "-350px";
                        button_3.background = "red";
                        advancedTexture.addControl(button_3);
                } else if (key == "Backspace") {
                        // Reset the boxes and lines
                        for (var i = 0; i < box_list.length; i++) {
                                box_list[i].dispose();
                                lines[i].dispose();
                        }
                        box_list.splice(0, box_list.length);
                        lines.splice(0, lines.length);

                        for (var i = 0; i < second_box_list.length; i++) {
                                second_box_list[i].dispose();
                                second_lines[i].dispose();
                        }
                        second_box_list.splice(0, second_box_list.length);
                        second_lines.splice(0, second_lines.length);

                        count = 0;
                        button_3.dispose();
                        button_3 = BABYLON.GUI.Button.CreateSimpleButton("countBut", count.toString());
                        button_3.width = "100px";
                        button_3.height = "25px";
                        button_3.color = "white";
                        button_3.top = "-250px";
                        button_3.left = "-350px";
                        button_3.background = "red";
                        advancedTexture.addControl(button_3);
                }
        }
        }));

        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
                keyDown = false;
        }));

        // Clicking the letter boxes will make it spin
        window.addEventListener("click", function () {
                var initial_speed = 250;
                var k = 0;
                var angle = Math.PI / 0.5;

                var pickResult = scene.pick(scene.pointerX, scene.pointerY);

                if(pickResult.pickedMesh.name == "box") {
                        sound_a.play();
                        var speed = pickResult.pickedPoint.x - pickResult.pickedMesh.position.x;
                        if (speed > 0) {
                                initial_speed -= speed * 400;
                        } else {
                                angle = -angle;
                                initial_speed -= -speed * 400;
                        }

                        var object_picked = pickResult.pickedMesh;
                        scene.registerBeforeRender(function() {
                                if(k <= initial_speed) {
                                        object_picked.rotate(BABYLON.Axis.Y, angle/initial_speed, BABYLON.Space.WORLD);
                                }
                                k += 1;
                        });
                }

        });

    return scene;
};

var scene = createScene(); 

engine.runRenderLoop(function () { 
        scene.render();
});


window.addEventListener("resize", function () { 
        engine.resize();
});