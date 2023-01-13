import secret from "../../secrets.json";
import { flatten } from "flat"

let env: string;
let node_env = process.env.NODE_ENV;

if (node_env && Object.keys(secret).includes(node_env)) {
	env = node_env;
} else {
	env = "local";
}

process.env = secret["default"]
	? { ...flatten(secret["default"], { safe: true, delimiter: "_" }), ...flatten(secret[env], { safe: true, delimiter: "_" }), ...process.env }
	: { ...secret[env], ...process.env };
