import { ArrowRight, BookOpenText, ListTree } from "lucide-react";
import Link from "next/link";
import { getGuideCategory, getRelatedGuides } from "@/lib/guides";

export function GuideReadingFooter({ currentHref }: { currentHref: string }) {
  const relatedGuides = getRelatedGuides(currentHref, 3);

  return (
    <section className="mt-12 overflow-hidden rounded-lg bg-white shadow-[0_20px_55px_rgba(45,52,53,0.045)] ring-1 ring-[#adb3b4]/15">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,0.82fr)_minmax(320px,0.48fr)]">
        <div className="border-b border-[#edf0f1] p-6 sm:p-7 lg:border-b-0 lg:border-r">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f3ec] text-[#2f7a4b]">
            <ListTree size={18} />
          </div>
          <h2 className="mt-5 font-serif text-2xl font-semibold tracking-normal text-[#202829]">
            继续看指南，或回到比价工具。
          </h2>
          <p className="mt-3 max-w-[68ch] text-sm leading-7 text-[#5a6061]">
            指南负责把路径和风险讲清楚；比价工具负责查看当前可见的有货报价、来源和更新时间。
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/guides"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#2d3435] px-5 text-sm font-semibold text-[#f8f8f8] transition hover:-translate-y-0.5 hover:bg-[#202829]"
            >
              返回指南目录
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/?stock=available"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#f2f4f4] px-5 text-sm font-semibold text-[#2d3435] ring-1 ring-[#adb3b4]/15 transition hover:bg-[#dde4e5]"
            >
              查看有货报价
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="bg-[#f9f9f9] p-6 sm:p-7">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#5a6061]">
            <BookOpenText size={15} />
            相关推荐
          </div>
          <div className="mt-4 space-y-3">
            {relatedGuides.map((guide) => {
              const category = getGuideCategory(guide.categoryId);

              return (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group block rounded-lg bg-white px-4 py-4 ring-1 ring-[#adb3b4]/15 transition hover:-translate-y-0.5 hover:bg-[#fbfcfc]"
                >
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex h-6 items-center rounded-full bg-[#e8f3ec] px-2.5 text-xs font-semibold text-[#2f7a4b]">
                      {category?.label ?? "指南"}
                    </span>
                    <span className="text-xs text-[#5a6061]">{guide.intent}</span>
                  </span>
                  <span className="mt-2 block font-semibold text-[#202829]">{guide.title}</span>
                  <span className="mt-1 block text-sm leading-6 text-[#5a6061]">{guide.description}</span>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2d3435]">
                    继续阅读
                    <ArrowRight size={15} className="transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
