import { Stack } from "cdktf-factory";

import { Container, Image, DockerProvider } from "@cdktf/provider-docker";

const Construct = Stack("example");

new DockerProvider(Construct, "docker-provider", {});

const image = new Image(Construct, "nginx-image", {
    name: "nginx:latest",
    keepLocally: false,
});

new Container(Construct, "nginx-container", {
    name: "tutorial",
    image: image.latest,
    ports: [
        {
            internal: 80,
            external: 8000
        },
    ],
});

Construct.source.synth();