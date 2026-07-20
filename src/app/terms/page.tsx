import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "利用規約",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10 text-zinc-200">
      <h1 className="mb-8 text-3xl font-bold">
        利用規約
      </h1>

      <div className="space-y-8 leading-8">

        <section>
          <h2 className="mb-2 text-xl font-semibold">
            1. 本サービスについて
          </h2>

          <p>
            「夜泣き・ワンオペ愚痴の駆け込み寺」は、
            匿名で育児に関する気持ちや愚痴を投稿できるサービスです。
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">
            2. 禁止事項
          </h2>

          <ul className="list-disc space-y-2 pl-6">
            <li>法令または公序良俗に反する投稿</li>
            <li>個人情報の投稿</li>
            <li>誹謗中傷・脅迫・差別的表現</li>
            <li>広告・宣伝・営業行為</li>
            <li>サービス運営を妨げる行為</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">
            3. 投稿について
          </h2>

          <p>
            投稿は毎日午前6時頃に自動削除されます。
            投稿内容の保存は保証されません。
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">
            4. 免責事項
          </h2>

          <p>
            本サービスの利用によって生じた損害について、
            運営者は責任を負いません。
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">
            5. サービス変更
          </h2>

          <p>
            本サービスは予告なく変更・停止・終了する場合があります。
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">
            6. 規約の変更
          </h2>

          <p>
            本規約は必要に応じて変更することがあります。
          </p>
        </section>

      </div>
    </main>
  );
}