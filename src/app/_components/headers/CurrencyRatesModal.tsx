"use client";

import { useState, useEffect } from "react";
import { useCommonTranslation } from "@/hooks/useTranslation";
import { Button } from "@/ui/button";
import { Modal } from "../modal";
import { Coin1, ArrowDown2 } from "iconsax-react";
import { Loading } from "@/ui/loading";

interface FrankfurterRatesResponse {
  amount: number;
  base: string;
  date: string;
  rates: {
    EUR?: number;
    TRY?: number;
    [key: string]: number | undefined;
  };
}

interface CurrencyRatesModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showTrigger?: boolean;
}

export const CurrencyRatesModal = ({ open, onOpenChange, showTrigger = true }: CurrencyRatesModalProps) => {
  const t = useCommonTranslation();
  const [internalOpen, setInternalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<FrankfurterRatesResponse | null>(null);

  const isOpen = open ?? internalOpen;
  const setIsOpen = onOpenChange ?? setInternalOpen;

  const fetchRates = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "https://api.frankfurter.dev/v1/latest?base=USD&symbols=TRY,EUR"
      );
      if (!res.ok) {
        throw new Error(`Failed to fetch rates: ${res.status}`);
      }
      const json: FrankfurterRatesResponse = await res.json();
      setData(json);
    } catch (err: any) {
      console.error("Currency rates fetch error:", err);
      setError(t("messages.dataProblem"));
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    fetchRates();
  }, [isOpen]);

  const formatNumber = (value: number | undefined) => {
    if (value == null || Number.isNaN(value)) return "-";
    return new Intl.NumberFormat("en-US", { maximumFractionDigits: 4 }).format(value);
  };

  const eurToTry =
    data?.rates?.TRY != null && data?.rates?.EUR != null
      ? (data.rates.TRY as number) / (data.rates.EUR as number)
      : undefined;

  return (
    <>
      {showTrigger && (
        <Button
          variant={"outline"}
          size={"medium"}
          className="border-white text-white bg-transparent"
          onClick={() => setIsOpen(true)}
        >
          <Coin1 className="stroke-white" />
          {t("buttons.convertCurrency")}
          <ArrowDown2 className="stroke-white size-4" />
        </Button>
      )}

      <Modal
        open={isOpen}
        onOpenChange={setIsOpen}
        title={t("buttons.convertCurrency")}
        description=""
        showConfirm={false}
        showCancel={false}
        size="medium"
      >
        <div className="flex items-center justify-between mb-3">
          <p className="text-caption text-description">
            {t("currency.base")}: <span className="font-semibold text-title">{t("currency.lira")} (TRY)</span>
          </p>

          <div className="flex items-center justify-between text-sm text-description">
            <span>{t("currency.lastUpdated")}: {data?.date || "-"}</span>
          </div>
        </div>

        <div className="space-y-4">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <Loading type="ring" size={"large"} className="mx-auto mb-3" />
                <p className="text-caption text-description">{t("messages.loading")}</p>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-error/40 bg-error/5 p-3">
              <p className="text-error">{error}</p>
            </div>
          )}

          {!loading && !error && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xl lg:text-2xl font-semibold text-title">{t("currency.usd")}</p>
                    </div>
                    <p className="text-lg text-description">=</p>
                    <div className="text-right">
                      <p className="text-xl lg:text-2xl font-semibold text-primary">
                        {formatNumber(data?.rates?.TRY)} <span className="text-title">{t("currency.lira")}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-border p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xl lg:text-2xl font-semibold text-title">{t("currency.eur")}</p>
                    </div>
                    <p className="text-lg text-description">=</p>
                    <div className="text-right">
                      <p className="text-xl lg:text-2xl font-semibold text-primary">
                        {formatNumber(eurToTry)} <span className="text-title">{t("currency.lira")}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};