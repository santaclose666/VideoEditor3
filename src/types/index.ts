export interface MediaProps {
  id: string;
  name: string;
  thumbnail: string;
  duration: number;
  timelineData: string[];
  dateCreated: string;
  size: string;
}

export interface videoTrim {
  startTime?: number;
  endTime?: number;
  speed?: number;
}

export type mode = null | 'trim' | 'speed';