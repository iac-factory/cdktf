import { Stack } from "@iac-factory/cdktf";

import { Container, Image, DockerProvider } from "@cdktf/provider-docker";

/*** @constructor */
export function Docker(construct = Stack("stack")) {
    new DockerProvider(construct, "docker-provider", {});

    const image = new Image(construct, "nginx-image", {
        name: "nginx:latest",
        keepLocally: false,
    });

    new Container(construct, "nginx-container", {
        name: "tutorial",
        image: image.latest,
        ports: [
            {
                internal: 80,
                external: 8000
            },
        ],
    });

    return construct;
}

Docker().source.synth();
