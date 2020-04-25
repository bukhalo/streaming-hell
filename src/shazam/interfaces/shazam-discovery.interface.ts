export interface ShazamDiscovery {
  hub: {
    options: {
      apple?: {
        openin?: {
          actions?: [
            {
              type?: string;
              uri?: string;
            },
          ];
        };
      };
      spotify?: {
        openin?: {
          actions?: [
            {
              type?: string;
              uri?: string;
            },
          ];
        };
      };
    };
  };
}
