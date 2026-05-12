import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const variantStyles = {
  success: {
    title: "Success",
    icon: CheckCircleIcon,
    accent: "from-emerald-500 to-emerald-400",
    shell: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    text: "text-slate-900",
    message: "text-slate-600",
  },
  error: {
    title: "Error",
    icon: XCircleIcon,
    accent: "from-rose-500 to-rose-400",
    shell: "bg-rose-50 text-rose-600 ring-rose-100",
    text: "text-slate-900",
    message: "text-slate-600",
  },
  info: {
    title: "Update",
    icon: InformationCircleIcon,
    accent: "from-sky-500 to-cyan-400",
    shell: "bg-sky-50 text-sky-600 ring-sky-100",
    text: "text-slate-900",
    message: "text-slate-600",
  },
  default: {
    title: "Notice",
    icon: ExclamationTriangleIcon,
    accent: "from-amber-500 to-orange-400",
    shell: "bg-amber-50 text-amber-600 ring-amber-100",
    text: "text-slate-900",
    message: "text-slate-600",
  },
};

export default function NotificationTemplate({
  message,
  options,
  style,
  close,
}) {
  const variant = variantStyles[options.type] || variantStyles.default;
  const Icon = variant.icon;
  const elevatedStyle = {
    ...style,
    top: "5.5rem",
  };

  return (
    <div
      role="alert"
      aria-live="polite"
      style={elevatedStyle}
      className={`shopsphere-alert ${variant.text}`}
    >
      <div
        className={`shopsphere-alert__accent bg-gradient-to-b ${variant.accent}`}
      />
      <div className={`shopsphere-alert__icon ring-1 ${variant.shell}`}>
        <Icon className="h-5 w-5 stroke-[1.75]" />
      </div>
      <div className="min-w-0 flex-1 py-0.5">
        <p className="shopsphere-alert__title">{variant.title}</p>
        <p className={`shopsphere-alert__message ${variant.message}`}>
          {message}
        </p>
      </div>
      <button
        type="button"
        onClick={close}
        aria-label="Dismiss notification"
        className="shopsphere-alert__close"
      >
        <XMarkIcon className="h-4 w-4 stroke-[2.25]" />
      </button>
    </div>
  );
}
