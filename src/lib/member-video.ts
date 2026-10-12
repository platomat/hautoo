/** localStorage: session token from Worker `/unlock` (not the plaintext access code). */
export const MEMBER_VIDEO_TOKEN_KEY = "hautuu-member-video-token";
export const MEMBER_VIDEO_EXPIRES_KEY = "hautuu-member-video-expires";

export type MemberVideoEmbedProps = {
	/** Object key in the private R2 bucket (e.g. `folge-010.mp4`). */
	src: string;
	title: string;
	poster?: string;
};
