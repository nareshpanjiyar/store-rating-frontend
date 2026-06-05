import { Star } from "lucide-react";

export default function StarRating({ value, onChange, editable = false }) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => editable && onChange(star)}
        >
          <Star
            fill={star <= value ? "currentColor" : "none"}
            className={star <= value ? "text-yellow-400" : "text-slate-500"}
          />
        </button>
      ))}
    </div>
  );
}
