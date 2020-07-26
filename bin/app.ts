#!/usr/bin/env node

import { App } from "@aws-cdk/core"
import { HypifyStack } from "../lib/hypify-stack"

const app = new App()
new HypifyStack(app, "Hypify")
