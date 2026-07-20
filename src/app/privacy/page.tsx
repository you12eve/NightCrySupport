import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10 text-zinc-200">

      <h1 className="mb-8 text-3xl font-bold">
        プライバシーポリシー
      </h1>

      <div className="space-y-8 leading-8">

        <section>
          <h2 className="mb-2 text-xl font-semibold">
            1. 取得する情報
          </h2>

          <ul className="list-disc space-y-2 pl-6">
            <li>匿名投稿内容</li>
            <li>リアクション情報</li>
            <li>匿名利用者識別ID（Guest ID）</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">
            2. 利用目的
          </h2>

          <ul className="list-disc space-y-2 pl-6">
            <li>サービス提供</li>
            <li>不正利用防止</li>
            <li>サービス改善</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">
            3. 保存期間
          </h2>

          <p>
            投稿およびリアクションは、
            毎日午前6時頃に自動削除されます。
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">
            4. 第三者提供
          </h2>

          <p>
            法令に基づく場合を除き、
            個人情報を第三者へ提供しません。
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">
            5. 外部サービス
          </h2>

          <p>
            本サービスではデータ保存のため
            Supabaseを利用しています。
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">
            6. ポリシー変更
          </h2>

          <p>
            本ポリシーは必要に応じて変更する場合があります。
          </p>
        </section>

      </div>

    </main>
  );
}