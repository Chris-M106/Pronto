import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import Card from '../../components/Card';
import { colors } from '../../utils/colors';
import { fontSize, fontWeight, radius, spacing } from '../../utils/spacing';
import { useBookingStore } from '../../store/bookingStore';

function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const ampm = (h ?? 0) >= 12 ? 'PM' : 'AM';
  const hour12 = (h ?? 0) % 12 || 12;
  return `${hour12}:${String(m ?? 0).padStart(2, '0')} ${ampm}`;
}

function formatDisplay(date: string | null, time: string | null): string {
  if (!date) return 'Flexible';
  const d = new Date(date + 'T00:00:00');
  const datePart = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  if (!time) return datePart;
  return `${datePart} at ${formatTime(time)}`;
}

export default function DateTimeStep() {
  const { draft, setDraft } = useBookingStore();
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dateValue: Date = draft.date ? new Date(draft.date + 'T00:00:00') : today;

  const timeValue: Date = (() => {
    const d = new Date();
    if (draft.time) {
      const [h, m] = draft.time.split(':').map(Number);
      d.setHours(h ?? 9, m ?? 0, 0, 0);
    } else {
      d.setHours(9, 0, 0, 0);
    }
    return d;
  })();

  function onDateChange(event: DateTimePickerEvent, date?: Date) {
    if (Platform.OS === 'android') setShowDate(false);
    if (event.type === 'set' && date) {
      const y = date.getFullYear();
      const mo = String(date.getMonth() + 1).padStart(2, '0');
      const d = String(date.getDate()).padStart(2, '0');
      setDraft({ date: `${y}-${mo}-${d}` });
    }
  }

  function onTimeChange(event: DateTimePickerEvent, date?: Date) {
    if (Platform.OS === 'android') setShowTime(false);
    if (event.type === 'set' && date) {
      const h = String(date.getHours()).padStart(2, '0');
      const m = String(date.getMinutes()).padStart(2, '0');
      setDraft({ time: `${h}:${m}` });
    }
  }

  const display = formatDisplay(draft.date, draft.time);

  return (
    <View>
      <Pressable
        onPress={() => setShowDate(true)}
        style={[styles.pickerBtn, draft.date ? styles.pickerBtnActive : null]}
      >
        <Text style={styles.pickerIcon}>📅</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.pickerLabel}>Date</Text>
          <Text style={styles.pickerValue}>
            {draft.date
              ? new Date(draft.date + 'T00:00:00').toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })
              : 'Tap to select'}
          </Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </Pressable>

      <Pressable
        onPress={() => setShowTime(true)}
        style={[styles.pickerBtn, { marginTop: spacing.sm }, draft.time ? styles.pickerBtnActive : null]}
      >
        <Text style={styles.pickerIcon}>🕐</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.pickerLabel}>Time</Text>
          <Text style={styles.pickerValue}>
            {draft.time ? formatTime(draft.time) : 'Tap to select'}
          </Text>
        </View>
        <Text style={styles.chevron}>›</Text>
      </Pressable>

      {(draft.date || draft.time) ? (
        <Card style={{ marginTop: spacing.md, backgroundColor: colors.blueBg, borderColor: colors.blueLight }}>
          <Text style={{ color: colors.navy, fontWeight: fontWeight.bold, fontSize: fontSize.md }}>
            {display}
          </Text>
        </Card>
      ) : null}

      {(draft.date || draft.time) ? (
        <Pressable
          onPress={() => setDraft({ date: null, time: null })}
          style={{ marginTop: spacing.sm, alignSelf: 'center' }}
        >
          <Text style={{ color: colors.textMuted, fontSize: fontSize.sm }}>Clear — make flexible</Text>
        </Pressable>
      ) : null}

      <Card style={{ marginTop: spacing.md }}>
        <Text style={{ color: colors.textMuted, fontSize: fontSize.sm }}>
          Leave blank for "flexible" — let the pro propose a time.
        </Text>
      </Card>

      {showDate && (
        <DateTimePicker
          value={dateValue}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          minimumDate={today}
          onChange={onDateChange}
        />
      )}

      {showTime && (
        <DateTimePicker
          value={timeValue}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={false}
          onChange={onTimeChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  pickerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.white,
    gap: spacing.sm,
  },
  pickerBtnActive: {
    borderColor: colors.blue,
    backgroundColor: colors.blueBg,
  },
  pickerIcon: { fontSize: 24 },
  pickerLabel: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: fontWeight.bold,
  },
  pickerValue: {
    fontSize: fontSize.md,
    color: colors.navy,
    fontWeight: fontWeight.semibold,
    marginTop: 2,
  },
  chevron: { fontSize: 20, color: colors.textMuted },
});
