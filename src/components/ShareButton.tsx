import React, { useState } from "react";
import {
  Share2,
  Copy,
  Check,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Instagram,
  Youtube,
  X,
} from "lucide-react";

interface ShareButtonProps {
  url: string;
  title: string;
  description: string;
  className?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  url,
  title,
  description,
  className = "",
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    message: string;
    platform: string;
  }>({ title: "", message: "", platform: "" });

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareOnFacebook = () => {
    // Facebook's sharer.php doesn't support pre-populated content well
    // Instead, we'll copy the content to clipboard and guide the user
    const facebookText = `${title}\n\n${description}\n\n${url}`;
    navigator.clipboard.writeText(facebookText);
    setModalContent({
      title: "Content Copied!",
      message:
        "You can now paste it in your Facebook post. The link preview will appear automatically when you paste the URL.",
      platform: "Facebook",
    });
    setShowModal(true);
  };

  const shareOnTwitter = () => {
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title + " - " + description)}`;
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  const shareOnLinkedIn = () => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`;
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  const shareOnWhatsApp = () => {
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(
      `${title} - ${description}\n\n${url}`
    )}`;
    window.open(shareUrl, "_blank");
  };

  const shareOnInstagram = () => {
    // Instagram doesn't support direct URL sharing, so we copy to clipboard
    const instagramText = `${title}\n\n${description}\n\n${url}`;
    navigator.clipboard.writeText(instagramText);
    setModalContent({
      title: "Content Copied!",
      message: "You can now paste it in your Instagram story or post.",
      platform: "Instagram",
    });
    setShowModal(true);
  };

  const shareOnYouTube = () => {
    // YouTube doesn't support direct URL sharing, so we copy to clipboard
    const youtubeText = `${title}\n\n${description}\n\n${url}`;
    navigator.clipboard.writeText(youtubeText);
    setModalContent({
      title: "Content Copied!",
      message:
        "You can now paste it in your YouTube video description or comments.",
      platform: "YouTube",
    });
    setShowModal(true);
  };

  const shareOnReddit = () => {
    const shareUrl = `https://reddit.com/submit?url=${encodeURIComponent(
      url
    )}&title=${encodeURIComponent(title)}`;
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
      >
        <Share2 size={16} />
        Share
      </button>

      {showDropdown && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowDropdown(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-[9999]">
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Share this case study
              </h3>

              {/* Social Media Buttons */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <button
                  onClick={shareOnFacebook}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                >
                  <Facebook size={14} />
                  Facebook
                </button>

                <button
                  onClick={shareOnTwitter}
                  className="flex items-center gap-2 px-3 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition-colors text-sm"
                >
                  <Twitter size={14} />
                  Twitter
                </button>

                <button
                  onClick={shareOnLinkedIn}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors text-sm"
                >
                  <Linkedin size={14} />
                  LinkedIn
                </button>

                <button
                  onClick={shareOnWhatsApp}
                  className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
                >
                  <MessageCircle size={14} />
                  WhatsApp
                </button>

                <button
                  onClick={shareOnInstagram}
                  className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded hover:from-purple-600 hover:to-pink-600 transition-colors text-sm"
                >
                  <Instagram size={14} />
                  Instagram
                </button>

                <button
                  onClick={shareOnYouTube}
                  className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                >
                  <Youtube size={14} />
                  YouTube
                </button>

                <button
                  onClick={shareOnReddit}
                  className="flex items-center gap-2 px-3 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors text-sm"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                  </svg>
                  Reddit
                </button>
              </div>

              {/* Copy URL */}
              <div className="border-t border-gray-200 pt-3">
                <button
                  onClick={handleCopyUrl}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copy URL
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Custom Modal */}
      {showModal && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999]"
            onClick={() => setShowModal(false)}
          />

          {/* Modal */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl border border-gray-200 z-[10000] w-full max-w-md mx-4">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {modalContent.title}
                  </h3>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed">
                  {modalContent.message}
                </p>

                {/* Platform-specific icon */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    {modalContent.platform === "Facebook" && (
                      <Facebook className="w-5 h-5 text-blue-600" />
                    )}
                    {modalContent.platform === "Instagram" && (
                      <Instagram className="w-5 h-5 text-purple-600" />
                    )}
                    {modalContent.platform === "YouTube" && (
                      <Youtube className="w-5 h-5 text-red-600" />
                    )}
                    <span className="text-sm font-medium text-gray-600">
                      Ready to share on {modalContent.platform}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Got it!
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ShareButton;
