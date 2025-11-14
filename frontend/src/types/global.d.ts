export {};

declare global {
    type GtagCommand = 'config' | 'set' | 'js' | 'event';

    interface Gtag {
      (command: 'js', date: Date): void;
      (command: 'config', targetId: string, config?: Record<string, unknown>): void;
      (command: 'set', config: Record<string, unknown>): void;
      (command: 'event', eventName: string, eventParams?: Record<string, unknown>): void;
    }

    var gtag: Gtag | undefined;
    var dataLayer:  Array<IArguments> | undefined;
}

