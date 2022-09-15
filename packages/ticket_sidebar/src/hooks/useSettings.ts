import { Settings } from "../types";
import zafClient from "@app/zendesk/sdk";
import { useEffect, useState } from "react";

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>();

  const getSettings = async () => {
    const clientMetadata = await zafClient.metadata();
    const zafSettings = clientMetadata.settings as Settings;

    setSettings(zafSettings);
  };

  useEffect(() => {
    getSettings();
  }, []);

  return settings;
};
