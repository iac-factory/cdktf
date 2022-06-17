# [`cdktf-factory`](https://github.com/iac-factory/cdktf-factory) #

A functional wrapper for `constructs` & `cdktf`.

## Usage ##

```bash
npm i cdktf-factory
```

### Implementation ###

***Example*** - Docker

```typescript
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

/*** npm run synth || npx cdktf@latest -- synth */

Construct.source.synth();
```

## Design Philosophy ##

Using functions vs classes is essentially a religious debate. However, in the
context of IaC, there are a few reasons to elect for functional, prototypal
development.

Take for example a client package: `example-client`. The developer(s) behind `example-client`
want the fastest, easiest means to define their infrastructure, but don't care to
learn straight `terraform` as their package is purely `typescript`.

The first, perhaps most obvious benefit is the use of only a global namespace.
There exists no `class` or `Function` nested namespaces.

I then remove the requirement of using both `IContruct` types: `TerraformStack` and `App`. At first when working
with `cdktf`, I actually experienced some runtime errors when working with more than
a single stack. I also experienced colleagues make the same mistakes.

Additionally, the ability to extend or inherit from `Stack` (at least easily), was removed.

The `Stack` wrapper should only ever be used as an ***interface*** -- e.g. the `Stack` wrapper
is intended to be composed in context, not extended into a namespace.

Lastly, but most importantly, ***I want a means to provide long-term support while
also ensuring of backwards compatability.***

If the client can only initialize `Stack` via `<Function> (input: string) ()`, and the
return type always remains a `IConstruct`, I now have the capability to extend the
`cdktf-factory` context as much as needed. For example, I can add default tags
(not only in the context of `aws`) that then get propagated to all downstream client packages, as well as provide special
terraform backend(s) by default.