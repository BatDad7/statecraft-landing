import { getCurrentTopic } from '../lib/pacing';

describe('Smart Pacing Logic', () => {
  test('returns Unit 1 (Foundations) for August 15', () => {
    // Use mid-day to avoid timezone shifting to previous day
    const aug = new Date('2024-08-15T12:00:00');
    const topic = getCurrentTopic(aug);
    expect(topic.id).toBe('UNIT_1');
    expect(topic.name).toContain('Foundations');
  });

  test('returns Unit 2 (Branches) for October 15', () => {
    const oct = new Date('2024-10-15');
    const topic = getCurrentTopic(oct);
    expect(topic.id).toBe('UNIT_2');
    expect(topic.name).toContain('Interactions');
  });

  test('returns Unit 3 (Civil Liberties) for November 15', () => {
    const nov = new Date('2024-11-15');
    const topic = getCurrentTopic(nov);
    expect(topic.id).toBe('UNIT_3');
    expect(topic.name).toContain('Civil Liberties');
  });

  test('returns Unit 4/5 (Ideologies) for December 15 (Wrap Start)', () => {
    const dec = new Date('2024-12-15');
    const topic = getCurrentTopic(dec);
    expect(topic.id).toBe('UNIT_4_5');
    expect(topic.name).toContain('Ideologies');
  });

  test('returns Unit 4/5 (Ideologies) for January 15 (Wrap End)', () => {
    const jan = new Date('2025-01-15');
    const topic = getCurrentTopic(jan);
    expect(topic.id).toBe('UNIT_4_5');
    expect(topic.name).toContain('Ideologies');
  });

  test('returns Exam Review for March 15', () => {
    const march = new Date('2025-03-15');
    const topic = getCurrentTopic(march);
    expect(topic.id).toBe('REVIEW');
    expect(topic.name).toContain('Exam Review');
  });

  test('returns Current Events (Fallback) for June (Summer)', () => {
    const june = new Date('2025-06-15');
    const topic = getCurrentTopic(june);
    expect(topic.id).toBe('CURRENT_EVENTS');
    // Name changed to "Political Context" in current implementation.
    expect(topic.name).toContain('Political Context');
  });
});
