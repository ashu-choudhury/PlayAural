import { registerRootComponent } from "expo";
import { Platform } from "react-native";

import { initializeAndroidForegroundService } from "./src/background/AndroidForegroundService";

const globalScope = globalThis as typeof globalThis & {
  DOMException?: typeof DOMException;
  __PlaySonic_NATIVE_VOICE_BOOTSTRAP_ERROR__?: string;
};

function ensureDomExceptionPolyfill(): void {
  if (typeof globalScope.DOMException === "function") {
    return;
  }

  class PlaySonicDOMException extends Error {
    constructor(message = "", name = "Error") {
      super(message);
      this.name = name;
    }
  }

  globalScope.DOMException = PlaySonicDOMException as unknown as typeof DOMException;
}

ensureDomExceptionPolyfill();

if (Platform.OS !== "web") {
  if (Platform.OS === "android") {
    initializeAndroidForegroundService();
  }
  try {
    const { registerGlobals } =
      require("@livekit/react-native") as typeof import("@livekit/react-native");
    registerGlobals();
  } catch (error) {
    globalScope.__PlaySonic_NATIVE_VOICE_BOOTSTRAP_ERROR__ =
      error instanceof Error ? error.message : String(error);
    console.warn("PlaySonic: voice bootstrap failed during native startup.", error);
  }
}

const App = require("./App").default as typeof import("./App").default;
registerRootComponent(App);

