import { NOTICES } from "../../config/event";

export function NoticeBanner() {
  return (
    <div className="notice-banner">
      <span className="notice-banner__icon">📌</span>
      <div className="notice-banner__content">
        <strong>{NOTICES.MaDstersZion.title}</strong>
        <br />
        <span className="notice-banner__body">{NOTICES.MaDstersZion.body}</span>
      </div>
    </div>
  );
}
