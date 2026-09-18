# VisionCart AI

> Turn any paused TV moment into a shoppable discovery.

VisionCart is a Fire TV-focused viewing experience that lets viewers discover products directly from the scenes they are watching.

Instead of leaving a show to search for an object later, viewers can pause the scene, select an item, explore visually similar products, compare price and delivery, and save the product for later.

## What it does

- Pause a scene and select objects inside the frame
- Explore visual product matches
- See product price, rating, delivery, and match reasoning
- Save products to a session cart
- Continue the experience on a phone through a QR handoff
- Use Judge Mode to experience the complete flow

## Fire TV controls

The interface is designed for a living-room viewing experience.

- Arrow keys: Select detected objects
- Enter: Inspect the selected object
- Space: Play or pause the scene
- S: Scan the paused frame
- J: Start Judge Mode
- Escape: Close open panels

## How we built it

VisionCart was built with:

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide icons
- Responsive web technologies

The current version uses deterministic demo scenes and catalog data so the complete experience is reliable during judging. The interface is structured to connect to a production computer-vision and product-catalog pipeline in the future.

## Run locally

```bash
cd visioncart-ai
pnpm install
pnpm dev

To run the production checks:
Bash
cd visioncart-ai
pnpm check
pnpm build

Demo flow
Start the scene.
Pause the frame.
Select an object, such as the floor lamp.
Scan the frame.
Open “Why this match.”
Compare products.
Add a product to the cart.
Open the QR handoff to continue on mobile.
Use Judge Mode for the complete guided walkthrough.


Project links
Live demo:

https://visioncart-fnur5vvg.manus.space
GitHub repository:

https://github.com/unnatigautam48-wq/visioncart-ai
Hackathon:

Build, Ship, Shape: Amazon Developer Hackathon
Recommended track:

Fire TV

Important scope note
This repository currently contains a deterministic client-side demo created for reliable hackathon judging. It does not claim live Amazon Bedrock or Amazon Rekognition API calls unless those integrations are added and documented in the source code.

License
This project is released under the MIT License.
