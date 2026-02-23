import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kycxtslwspltferppsst.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5Y3h0c2x3c3BsdGZlcnBwc3N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1OTUwMDMsImV4cCI6MjA4NzE3MTAwM30.rIgyV6CQYhBOnPwQaRxGQ76Omf_O1-gtHkGnKIcAAJY'

export const supabase = createClient(supabaseUrl, supabaseKey)