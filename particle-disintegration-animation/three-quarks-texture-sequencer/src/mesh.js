import * as THREE from "three";
import { ApplySequences, BatchedParticleRenderer, ConeEmitter, ConstantValue, DonutEmitter, GridEmitter, IntervalValue, ParticleSystem, RandomColor, RectangleEmitter, TextureSequencer, Vector3, Vector4 } from "three.quarks";

const group = new THREE.Group();

const batchRenderer = new BatchedParticleRenderer();
group.add(batchRenderer);

const loader = new THREE.TextureLoader();
const texture = loader.load('/point.png');

const particles = new ParticleSystem({
  duration: 10,
  looping: true,
  startLife: new ConstantValue(9),
  startSpeed: new ConstantValue(0),
  startSize: new IntervalValue(0.1, 0.2),
  startColor: new RandomColor(
    new Vector4(1, 1, 1, 1),
    new Vector4(1, 0.7, 0, 1)
  ),
  emissionOverTime: new ConstantValue(0),
  emissionBursts: [
    {
      time: 0,
      count: new ConstantValue(2000),
      probability: 1,
    },
  ],
  shape: new GridEmitter({
    width: 20,
    height: 20,
    column: 50,
    row: 50
  }),
  material: new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true
  })
});

group.add(particles.emitter);

batchRenderer.addSystem(particles);

export {
  batchRenderer
}

export default group;
