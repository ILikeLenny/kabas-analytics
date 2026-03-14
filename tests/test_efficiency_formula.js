/**
 * KB-34: Unit Tests — calculateEfficiency()
 *
 * Run with: node tests/test_efficiency_formula.js
 *
 * Tests cover:
 *  - Normal cases (FAST / BASE / SLOW lead time weights)
 *  - Edge cases (zero time, zero complexity, zero lead time, negative inputs)
 */

const { calculateEfficiency } = require('../src/efficiency_formula');

// =============================================================================
// Minimal test runner (no external libraries needed)
// =============================================================================
let passed = 0;
let failed = 0;

function assert(description, actual, expected) {
    if (Math.abs(actual - expected) < 0.001) {          // float-safe comparison
        console.log(`  ✅ PASS: ${description}`);
        console.log(`         Expected: ${expected} | Got: ${actual}`);
        passed++;
    } else {
        console.error(`  ❌ FAIL: ${description}`);
        console.error(`         Expected: ${expected} | Got: ${actual}`);
        failed++;
    }
}

// =============================================================================
// TEST SUITE 1: Happy Path (Normal Inputs)
// =============================================================================
console.log('\n' + '='.repeat(60));
console.log('TEST SUITE 1: Normal Cases');
console.log('='.repeat(60));

// Scenario from Jira: Medium Task (5), Done in 2 hours, PR merged in 12h (FAST)
// Expected: (5 / 2) * 1.2 = 3.0
assert(
    'FAST weight (<24h): complexity=5, time=2h, lead=12h',
    calculateEfficiency(5, 2, 12),
    3.0
);

// BASE weight (24–48h range): complexity=5, time=2h, lead=36h
// Expected: (5 / 2) * 1.0 = 2.5
assert(
    'BASE weight (24–48h): complexity=5, time=2h, lead=36h',
    calculateEfficiency(5, 2, 36),
    2.5
);

// SLOW weight (>48h): complexity=5, time=2h, lead=72h
// Expected: (5 / 2) * 0.8 = 2.0
assert(
    'SLOW weight (>48h): complexity=5, time=2h, lead=72h',
    calculateEfficiency(5, 2, 72),
    2.0
);

// Higher complexity = higher score
// complexity=10, time=5h, lead=12h → (10/5)*1.2 = 2.4
assert(
    'Higher complexity (10): complexity=10, time=5h, lead=12h',
    calculateEfficiency(10, 5, 12),
    2.4
);

// =============================================================================
// TEST SUITE 2: Boundary Conditions (Lead Time Boundaries)
// =============================================================================
console.log('\n' + '='.repeat(60));
console.log('TEST SUITE 2: Lead Time Boundary Conditions');
console.log('='.repeat(60));

// Lead time exactly 24h → FAST (< 24 is FAST, so 24 = BASE)
// Expected: (5/2) * 1.0 = 2.5
assert(
    'Exactly 24h lead time → BASE weight',
    calculateEfficiency(5, 2, 24),
    2.5
);

// Lead time exactly 48h → BASE (> 48 is SLOW, so 48 = BASE)
// Expected: (5/2) * 1.0 = 2.5
assert(
    'Exactly 48h lead time → BASE weight',
    calculateEfficiency(5, 2, 48),
    2.5
);

// Lead time = 0h → FAST (<24h)
// Expected: (5/2) * 1.2 = 3.0
assert(
    'Lead time = 0h → FAST weight',
    calculateEfficiency(5, 2, 0),
    3.0
);

// =============================================================================
// TEST SUITE 3: Edge Cases (Zero & Invalid Inputs)
// =============================================================================
console.log('\n' + '='.repeat(60));
console.log('TEST SUITE 3: Edge Cases (Zero & Invalid Inputs)');
console.log('='.repeat(60));

// timeSpentHours = 0 → should return 0 (division by zero guard)
assert(
    'timeSpentHours = 0 → returns 0 (division by zero guard)',
    calculateEfficiency(5, 0, 12),
    0
);

// timeSpentHours negative → should return 0
assert(
    'timeSpentHours = -1 → returns 0 (negative guard)',
    calculateEfficiency(5, -1, 12),
    0
);

// complexity = 0 → should return 0 (no complexity = no score)
// (0 / 2) * 1.2 = 0
assert(
    'complexity = 0 → returns 0',
    calculateEfficiency(0, 2, 12),
    0
);

// complexity negative → should return 0
assert(
    'complexity = -5 → returns 0 (negative guard)',
    calculateEfficiency(-5, 2, 12),
    0
);

// =============================================================================
// TEST SUITE 4: KB-35 — Null/Undefined Zero-Value Guards
// =============================================================================
console.log('\n' + '='.repeat(60));
console.log('TEST SUITE 4: KB-35 Zero-Value Guards (null/undefined)');
console.log('='.repeat(60));

// complexity = null → defaults to 1, uses FAST weight
// Expected: (1 / 2) * 1.2 = 0.6
assert(
    'complexity = null → defaults to 1: (1/2)*1.2 = 0.6',
    calculateEfficiency(null, 2, 12),
    0.6
);

// complexity = undefined → defaults to 1, uses BASE weight
// Expected: (1 / 2) * 1.0 = 0.5
assert(
    'complexity = undefined → defaults to 1: (1/2)*1.0 = 0.5',
    calculateEfficiency(undefined, 2, 36),
    0.5
);

// timeSpentHours = null → returns 0
assert(
    'timeSpentHours = null → returns 0',
    calculateEfficiency(5, null, 12),
    0
);

// Verify console.warn is triggered (not console.error) — check via spy
const warnMessages = [];
const originalWarn = console.warn;
console.warn = (msg) => warnMessages.push(msg);
calculateEfficiency(5, 0, 12); // should trigger warn
console.warn = originalWarn;

const warnFired = warnMessages.some(m => m.includes('[KABAS WARN]'));
if (warnFired) {
    console.log('  ✅ PASS: console.warn fires on zero-value input (not console.error)');
    passed++;
} else {
    console.error('  ❌ FAIL: console.warn did not fire on zero-value input');
    failed++;
}

// =============================================================================
// RESULTS SUMMARY
// =============================================================================
console.log('\n' + '='.repeat(60));
console.log(`RESULTS: ${passed} passed, ${failed} failed`);
if (failed === 0) {
    console.log('✅ ALL TESTS PASSED — KB-34 + KB-35 Definition of Done: MET');
    console.log('   • Function returns a valid float ✅');
    console.log('   • Outputs match expected results with dummy data ✅');
    console.log('   • Safe default returned instead of NaN/crash ✅');
    console.log('   • console.warn logged on zero-value data ✅');
} else {
    console.log('❌ SOME TESTS FAILED — Review the logic above');
}
console.log('='.repeat(60) + '\n');

process.exit(failed > 0 ? 1 : 0);
