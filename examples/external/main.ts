import { Stack } from "@iac-factory/cdktf";

import { Container, Image, DockerProvider } from "@cdktf/provider-docker";
import { App }                              from "cdktf";

const external = new App() as Stack["prototype"];

const Construct = Stack("example", external);

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

external.synth();