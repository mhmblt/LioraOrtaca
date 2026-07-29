$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$projectRoot = Split-Path -Parent $PSScriptRoot
$sourcePath = [System.IO.Path]::GetFullPath((Join-Path $projectRoot 'assets\liora-corner.png'))
$outputPath = [System.IO.Path]::GetFullPath((Join-Path $projectRoot 'assets\liora-social.jpg'))

if (-not $sourcePath.StartsWith($projectRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
  throw 'Source path is outside the project directory.'
}
if (-not $outputPath.StartsWith($projectRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
  throw 'Output path is outside the project directory.'
}

$source = [System.Drawing.Image]::FromFile($sourcePath)
$targetWidth = 1200
$targetHeight = 630
$targetRatio = $targetWidth / $targetHeight
$sourceRatio = $source.Width / $source.Height

if ($sourceRatio -gt $targetRatio) {
  $cropHeight = $source.Height
  $cropWidth = [int][math]::Round($cropHeight * $targetRatio)
  $cropX = [int][math]::Round(($source.Width - $cropWidth) / 2)
  $cropY = 0
} else {
  $cropWidth = $source.Width
  $cropHeight = [int][math]::Round($cropWidth / $targetRatio)
  $cropX = 0
  $cropY = [int][math]::Round(($source.Height - $cropHeight) / 2)
}

$bitmap = New-Object System.Drawing.Bitmap($targetWidth, $targetHeight)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)

try {
  $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy
  $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $destination = New-Object System.Drawing.Rectangle(0, 0, $targetWidth, $targetHeight)
  $sourceRectangle = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropWidth, $cropHeight)
  $graphics.DrawImage($source, $destination, $sourceRectangle, [System.Drawing.GraphicsUnit]::Pixel)

  $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object { $_.MimeType -eq 'image/jpeg' }
  $quality = New-Object System.Drawing.Imaging.EncoderParameter(
    [System.Drawing.Imaging.Encoder]::Quality,
    [long]88
  )
  $parameters = New-Object System.Drawing.Imaging.EncoderParameters(1)
  $parameters.Param[0] = $quality
  $bitmap.Save($outputPath, $encoder, $parameters)
} finally {
  if ($parameters) { $parameters.Dispose() }
  if ($quality) { $quality.Dispose() }
  $graphics.Dispose()
  $bitmap.Dispose()
  $source.Dispose()
}

Write-Output "Generated assets\liora-social.jpg"
