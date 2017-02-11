/**
 * Created by AKuzmanoski on 30/01/2017.
 */
export interface StompConfig {
  // Which server?
  host: string;
  port: number;
  ssl: boolean;

  // What credentials?
  user: string;
  pass: string;

  // Which queues?
  publish: string[];
  subscribe: string[];

  // How often to heartbeat?
  heartbeat_in?: number;
  heartbeat_out?: number;

  // Enable client debugging?
  debug: boolean;
}
